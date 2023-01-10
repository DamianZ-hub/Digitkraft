import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { UserAuthService } from "app/shared/services/user-auth.service";
import { Observable } from "rxjs";

@Injectable()
export class CanActivateAdmin implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly userAuthService: UserAuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const canActivate = this.userAuthService.isLoggedUser();

    if (!canActivate) {
      this.userAuthService.redirectToLogin();
    }

    return canActivate;
  }
}
