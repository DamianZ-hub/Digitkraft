import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class CanActivateBasic implements CanActivate {
  constructor(private readonly router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const canActivate = !!localStorage.getItem("sessionId"); // temporary guard

    if (!canActivate) {
      this.router.navigateByUrl("/login");
    }

    return canActivate;
  }
}
