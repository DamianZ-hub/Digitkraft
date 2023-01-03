import { Component, OnInit, ElementRef } from "@angular/core";
import { ROUTES } from "../../sidebar/sidebar.component";
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from "@angular/common";
import { Router } from "@angular/router";
import { CartService, ICartItem } from "../services/cart.service";
import { IProductDto } from "../services/rest-client-dtos/IProductDto";

@Component({
  // moduleId: module.id,
  selector: "navbar-cmp",
  templateUrl: "navbar.component.html",
  styleUrls: ["navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  private listTitles: any[];
  location: Location;
  private toggleButton: any;
  private sidebarVisible: boolean;
  searchText: string;
  showSearch = false;

  constructor(
    location: Location,
    private element: ElementRef,
    private readonly router: Router,
    private readonly cartService: CartService
  ) {
    this.location = location;
    this.sidebarVisible = false;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter((listTitle) => listTitle);
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName("navbar-toggle")[0];
  }
  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const body = document.getElementsByTagName("body")[0];
    setTimeout(function () {
      toggleButton.classList.add("toggled");
    }, 500);
    body.classList.add("nav-open");

    this.sidebarVisible = true;
  }
  sidebarClose() {
    const body = document.getElementsByTagName("body")[0];
    this.toggleButton.classList.remove("toggled");
    this.sidebarVisible = false;
    body.classList.remove("nav-open");
  }
  sidebarToggle() {
    // const toggleButton = this.toggleButton;
    // const body = document.getElementsByTagName('body')[0];
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }

  searchProduct() {
    this.router.navigateByUrl(`/productList?search=${this.searchText || ""}`);
    this.searchText = "";
  }

  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());

    if (titlee.includes("productList")) {
      this.showSearch = false;
    } else {
      this.showSearch = true;
    }

    if (titlee?.includes("productPreview")) {
      //XD
      return "Product Preview";
    }

    if (titlee?.includes("orderSummary")) {
      return "Order Summary";
    }

    if (titlee?.includes("productList")) {
      return "Product List";
    }

    if (titlee.charAt(0) === "#") {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return "Dashboard";
  }

  logout(): void {
    localStorage.removeItem("sessionId");
    this.router.navigateByUrl("/login");
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
