import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import {
  Routes,
  RouterModule,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CanActivateBasic } from "./auth/can-activate-basic";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  },
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full",
    canActivate: [CanActivateBasic],
  },
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./layouts/admin-layout/admin-layout.module").then(
            (x) => x.AdminLayoutModule
          ),
      },
    ],
    canActivate: [CanActivateBasic],
  },
  {
    path: "**",
    redirectTo: "dashboard",
    canActivate: [CanActivateBasic],
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  providers: [CanActivateBasic],
  exports: [],
})
export class AppRoutingModule {}
