import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (
      request.url.indexOf("login") !== -1 ||
      request.url.indexOf("register") !== -1
    ) {
      return next.handle(request);
    }

    const sessionId = localStorage.getItem("sessionId");
    const modifiedReq = request.clone({
      headers: request.headers.set("Authorization", sessionId),
    });

    return next.handle(modifiedReq);
  }
}
