import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CartService, ICartItem } from "app/shared/services/cart.service";
import { IProductDto } from "app/shared/services/rest-client-dtos/IProductDto";
import { UserAuthService } from "app/shared/services/user-auth.service";

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  onlyAdmin: boolean;
}

export const ROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Home",
    icon: "pe-7s-home",
    class: "",
    onlyAdmin: false,
  },
  {
    path: "/productList",
    title: "Product List",
    icon: "pe-7s-cart",
    class: "",
    onlyAdmin: false,
  },
  {
    path: "/addProduct",
    title: "Add Product",
    icon: "pe-7s-box2",
    class: "",
    onlyAdmin: true,
  },
  //{ path: '/user', title: 'User Profile',  icon:'pe-7s-user', class: '' },
  //{ path: "/table", title: "Table List", icon: "pe-7s-note2", class: "" },
  //{ path: '/typography', title: 'Typography',  icon:'pe-7s-news-paper', class: '' },
  //{ path: '/icons', title: 'Icons',  icon:'pe-7s-science', class: '' },
  //{ path: '/maps', title: 'Maps',  icon:'pe-7s-map-marker', class: '' },
  //{ path: '/notifications', title: 'Notifications',  icon:'pe-7s-bell', class: '' },*/
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(
    private readonly userAuth: UserAuthService,
    private readonly cartService: CartService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }
  canShowEntry(routeInfo: RouteInfo): boolean {
    return !routeInfo.onlyAdmin || this.userAuth.isAdminUser();
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }

  getLogoutText(): string {
    return this.userAuth.isLoggedUser() ? "Log out" : "Log in";
  }

  logout(): void {
    if (!this.userAuth.isLoggedUser()) {
      this.userAuth.redirectToLogin();
    } else {
      localStorage.removeItem("sessionId");
      this.router.navigateByUrl("/login");
    }
  }

  getCartItemAmount(): number {
    return this.cartService.getCurrentCart().length;
  }

  getCurrentCart(): Array<ICartItem> {
    return this.cartService.getCurrentCart();
  }

  removeCartItem(product: IProductDto): void {
    this.cartService.removeProduct(product);
  }
}
