import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class UserAuthService {
  constructor(private readonly router: Router) {}

  isLoggedUser: () => boolean = () => !!localStorage.getItem("sessionId");

  isAdminUser: () => boolean = () =>
    localStorage.getItem("isAdmin")?.toLowerCase() === "true";

  redirectToRegisterIfNotLogged(): void {
    if (!!this.isLoggedUser()) {
      this.redirectToLogin();
    }
  }

  redirectToLogin(): void {
    this.router.navigateByUrl("/login");
  }
}
