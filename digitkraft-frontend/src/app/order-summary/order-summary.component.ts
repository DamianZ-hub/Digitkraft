import { Component, OnDestroy, OnInit } from "@angular/core";
import { CartService } from "app/shared/services/cart.service";
import {
  NotificationHorizontalPosition,
  NotificationService,
  NotificationTypes,
  NotificationVerticalPosition,
} from "app/shared/services/notification-service.service";
import { IProductDto } from "app/shared/services/rest-client-dtos/IProductDto";
import { RestClientService } from "app/shared/services/rest-client.service";
import { catchError, of, take, tap } from "rxjs";

@Component({
  selector: "app-order-summary",
  templateUrl: "./order-summary.component.html",
  styleUrls: ["./order-summary.component.scss"],
})
export class OrderSummaryComponent implements OnInit {
  private _allProducts: Array<IProductDto> = [];
  loading = false;

  get products(): Array<IProductDto> {
    return this._allProducts.filter((x) => this.cart.checkIfAlreadyExists(x));
  }

  constructor(
    private readonly client: RestClientService,
    readonly cart: CartService,
    private readonly notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loading = true;

    this.client
      .getAllProducts()
      .pipe(
        take(1),
        tap(
          (data) => {
            this._allProducts = data;

            this.loading = false;
          },
          catchError((error) => {
            this.notificationService.showNotification(
              NotificationVerticalPosition.Top,
              NotificationHorizontalPosition.Center,
              error,
              NotificationTypes.Success
            );

            this.loading = false;

            return of(error);
          })
        )
      )
      .subscribe();
  }

  removeCartItem(product: IProductDto): void {
    this.cart.removeProduct(product);
  }
}
