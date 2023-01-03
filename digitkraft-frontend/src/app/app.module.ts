import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";

import { AppRoutingModule } from "./app.routing";
import { NavbarModule } from "./shared/navbar/navbar.module";
import { FooterModule } from "./shared/footer/footer.module";
import { SidebarModule } from "./sidebar/sidebar.module";

import { AppComponent } from "./app.component";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { HttpErrorNotificationInterceptor } from "./interceptors/http-error-notification.interceptor";
import { ProductListComponent } from "./product-list/product-list.component";
import { AuthInterceptor } from "./interceptors/auth.interceptor";
import { AddProductComponent } from "./add-product/add-product.component";
import { ProductPreviewComponent } from './product-preview/product-preview.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    NavbarModule,
    FooterModule,
    SidebarModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    RegisterComponent,
    ProductListComponent,
    AddProductComponent,
    ProductPreviewComponent,
    OrderSummaryComponent,
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: HttpErrorNotificationInterceptor,
    //   multi: true,
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
