import { Component, OnInit } from "@angular/core";
import { CartService } from "app/shared/services/cart.service";
import { IProductDto } from "app/shared/services/rest-client-dtos/IProductDto";
import { ISearchBodyDto } from "app/shared/services/rest-client-dtos/ISearchBodyDto";
import { RestClientService } from "app/shared/services/rest-client.service";
import { environment } from "environments/environment";
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Observable,
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
  fromPriceSubject = new BehaviorSubject(0);
  toPriceSubject = new BehaviorSubject(1000);
  searchSubject = new BehaviorSubject("");

  constructor(
    private readonly client: RestClientService,
    private readonly cart: CartService
  ) {}

  ngOnInit(): void {
    this.getCategories();
    this.filteredProducts$ = combineLatest([
      this.categorySubject,
      this.fromPriceSubject,
      this.toPriceSubject,
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
}

interface ICategoryData {
  name: string;
  value: string;
}
