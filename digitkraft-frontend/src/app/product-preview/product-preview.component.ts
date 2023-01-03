import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CartService } from "app/shared/services/cart.service";
import {
  NotificationHorizontalPosition,
  NotificationService,
  NotificationTypes,
  NotificationVerticalPosition,
} from "app/shared/services/notification-service.service";
import { IProductDto } from "app/shared/services/rest-client-dtos/IProductDto";
import { RestClientService } from "app/shared/services/rest-client.service";
import { catchError, filter, of, take, tap } from "rxjs";

@Component({
  selector: "app-product-preview",
  templateUrl: "./product-preview.component.html",
  styleUrls: ["./product-preview.component.scss"],
})
export class ProductPreviewComponent implements OnInit {
  product: IProductDto;
  loading = false;

  constructor(
    private readonly client: RestClientService,
    private readonly route: ActivatedRoute,
    private readonly notificationService: NotificationService,
    readonly cart: CartService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loading = true;

    this.route.queryParams.subscribe((params) => {
      const productName = params["name"];
      this.client
        .getAllProducts()
        .pipe(
          take(1),
          tap((x) => {
            this.product = x.filter((x) => x.name === productName)[0];
            this.loading = false;
          }),
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
        .subscribe();
    });
  }

  getImageFullPath(product: IProductDto): string {
    if (product.productImages?.length > 0) {
      const path = product.productImages[0].path;

      return this.client.getProductImageFullUrl(path);
    }
  }

  addProductToCart(product: IProductDto): void {
    if (this.cart.checkIfAlreadyExists(product)) {
      this.router.navigateByUrl("/orderSummary");
    } else {
      this.cart.addProduct(product);
    }
  }
}
