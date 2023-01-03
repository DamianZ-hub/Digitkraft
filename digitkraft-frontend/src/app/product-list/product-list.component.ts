import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CartService } from "app/shared/services/cart.service";
import { IProductDto } from "app/shared/services/rest-client-dtos/IProductDto";
import { ISearchBodyDto } from "app/shared/services/rest-client-dtos/ISearchBodyDto";
import { RestClientService } from "app/shared/services/rest-client.service";
import { query } from "chartist";
import { environment } from "environments/environment";
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  startWith,
  Subject,
  switchMap,
  tap,
} from "rxjs";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent implements OnInit {
  private readonly typingDebounceTimeout = 600;
  private readonly categoryAll = "";
  categories: Array<ICategoryData> = [];

  loading = false;

  filteredProducts$: Observable<Array<IProductDto>>;
  categorySubject = new BehaviorSubject(this.categoryAll);
  fromPriceSubject = new Subject();
  toPriceSubject = new Subject();
  searchSubject = new BehaviorSubject("");

  constructor(
    private readonly client: RestClientService,
    private readonly cart: CartService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.setSearchTextFromQuery();

    this.getCategories();
    this.filteredProducts$ = combineLatest([
      this.categorySubject,
      this.fromPriceSubject.pipe(startWith(0)),
      this.toPriceSubject.pipe(startWith(Number.MAX_VALUE)),
      this.searchSubject,
    ]).pipe(
      debounceTime(this.typingDebounceTimeout),
      distinctUntilChanged(),
      map(([categoryFilter, fromPriceFilter, toPriceFilter, searchFilter]) => {
        return {
          category: categoryFilter,
          minPrice: fromPriceFilter,
          maxPrice: toPriceFilter,
          name: searchFilter,
        } as ISearchBodyDto;
      }),
      filter(
        (requestBody) =>
          this.checkIfPriceIsValid(requestBody.maxPrice) &&
          this.checkIfPriceIsValid(requestBody.minPrice)
      ),
      tap(() => (this.loading = true)),
      switchMap((requestBody) => this.client.getProductSearch(requestBody)),
      tap(() => (this.loading = false))
    );
  }

  addProductToCart(product: IProductDto): void {
    if (this.cart.checkIfAlreadyExists(product)) {
      this.cart.removeProduct(product);
    } else {
      this.cart.addProduct(product);
    }
  }

  getCategories() {
    const categoryAll = {
      name: "All",
      value: this.categoryAll,
    } as ICategoryData;

    this.client.getCategories().subscribe((data) => {
      const mappedCategories = data.map((item) => {
        return { name: item.name, value: item.name } as ICategoryData;
      });

      this.categories = [categoryAll, ...mappedCategories];
    });
  }

  getImageFullPath(product: IProductDto): string {
    const path = product.productImages[0].path;

    return this.client.getProductImageFullUrl(path);
  }

  private checkIfPriceIsValid(price: string | number): boolean {
    return price == +price;
  }

  private setSearchTextFromQuery(): void {
    this.route.queryParams.subscribe((params) => {
      const searchTerm = params["search"];

      if (!!searchTerm) {
        this.searchSubject.next(searchTerm);
      }
    });
  }
}

interface ICategoryData {
  name: string;
  value: string;
}
