import { Component, OnInit } from "@angular/core";
import { CartService } from "app/shared/services/cart.service";
import { IProductListItemDto } from "app/shared/services/rest-client-dtos/IProductListItemDto";
import { RestClientService } from "app/shared/services/rest-client.service";
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
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

  loading = false;
  CATEGORIES = ["vtuber", "wire"];

  filteredProducts$: Observable<Array<IProductListItemDto>>;
  categorySubject = new BehaviorSubject(this.CATEGORIES[0]);
  fromPriceSubject = new BehaviorSubject(0);
  toPriceSubject = new BehaviorSubject(1000);
  searchSubject = new BehaviorSubject("");

  constructor(
    private readonly client: RestClientService,
    private readonly cart: CartService
  ) {}

  ngOnInit(): void {
    this.filteredProducts$ = combineLatest([
      this.categorySubject,
      this.fromPriceSubject,
      this.toPriceSubject,
      this.searchSubject,
    ]).pipe(
      debounceTime(this.typingDebounceTimeout),
      distinctUntilChanged(),
      tap(() => (this.loading = true)),
      switchMap((requestBody) => this.client.getProductList(requestBody[3])),
      tap(() => (this.loading = false))
    );
  }

  addProductToCart(product: IProductListItemDto): void {
    const productId = product.productId;

    if (this.cart.checkIfAlreadyExists(productId)) {
      this.cart.removeProduct(productId);
    } else {
      this.cart.addProduct(product);
    }
  }
}
