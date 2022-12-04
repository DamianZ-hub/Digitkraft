import { Injectable } from "@angular/core";
import {
  NotificationHorizontalPosition,
  NotificationService,
  NotificationTypes,
  NotificationVerticalPosition,
} from "./notification-service.service";
import { IProductListItemDto } from "./rest-client-dtos/IProductListItemDto";

@Injectable({
  providedIn: "root",
})
export class CartService {
  private readonly localStorageKey = "cart";
  private readonly setCurrentCart = (cart: Array<ICartItem>) =>
    localStorage.setItem(this.localStorageKey, JSON.stringify(cart));

  constructor(private readonly notificationService: NotificationService) {}

  readonly getCurrentCart = () =>
    (JSON.parse(localStorage.getItem(this.localStorageKey)) ||
      []) as Array<ICartItem>;

  addProduct(product: IProductListItemDto): void {
    const currentCart = this.getCurrentCart();
    currentCart.push({
      name: product.name,
      pictureUrl: product.pictureUrl,
      price: product.price,
      productId: product.productId,
    } as ICartItem);
    this.setCurrentCart(currentCart);

    this.notificationService.showNotification(
      NotificationVerticalPosition.Top,
      NotificationHorizontalPosition.Center,
      `Product ${product.name} has been added to cart`,
      NotificationTypes.Success
    );
  }

  removeProduct(productId: number): void {
    const currentCart = this.getCurrentCart();
    const newCart = currentCart.filter(
      (product) => product.productId !== productId
    );
    this.setCurrentCart(newCart);

    this.notificationService.showNotification(
      NotificationVerticalPosition.Top,
      NotificationHorizontalPosition.Center,
      `Product has been removed from cart`,
      NotificationTypes.Success
    );
  }

  checkIfAlreadyExists(productId: number): boolean {
    const currentCart = this.getCurrentCart();

    return !!currentCart.find((product) => product.productId === productId);
  }

  clearCart(): void {
    localStorage.setItem(this.localStorageKey, null);
  }
}

export interface ICartItem {
  name: string;
  price: number;
  productId: number;
  pictureUrl: string;
}
