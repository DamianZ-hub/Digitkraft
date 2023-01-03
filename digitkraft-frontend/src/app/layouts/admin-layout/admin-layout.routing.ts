import { Routes } from "@angular/router";

import { HomeComponent } from "../../home/home.component";
import { UserComponent } from "../../user/user.component";
import { TablesComponent } from "../../tables/tables.component";
import { TypographyComponent } from "../../typography/typography.component";
import { IconsComponent } from "../../icons/icons.component";
import { MapsComponent } from "../../maps/maps.component";
import { NotificationsComponent } from "../../notifications/notifications.component";
import { ProductListComponent } from "app/product-list/product-list.component";
import { AddProductComponent } from "app/add-product/add-product.component";
import { ProductPreviewComponent } from "app/product-preview/product-preview.component";
import { OrderSummaryComponent } from "app/order-summary/order-summary.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: HomeComponent },
  { path: "user", component: UserComponent },
  { path: "table", component: TablesComponent },
  { path: "typography", component: TypographyComponent },
  { path: "icons", component: IconsComponent },
  { path: "maps", component: MapsComponent },
  { path: "notifications", component: NotificationsComponent },
  { path: "productList", component: ProductListComponent },
  { path: "addProduct", component: AddProductComponent },
  { path: "productPreview", component: ProductPreviewComponent },
  { path: "orderSummary", component: OrderSummaryComponent },
];
