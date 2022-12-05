import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  NotificationHorizontalPosition,
  NotificationService,
  NotificationTypes,
  NotificationVerticalPosition,
} from "app/shared/services/notification-service.service";
import { environment } from "environments/environment";
import { catchError, Observable, of } from "rxjs";

@Injectable()
export class HttpErrorNotificationInterceptor implements HttpInterceptor {
  private successHttpCodes = [200, 201];

  constructor(private readonly notificationService: NotificationService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.url.indexOf(environment.apiBaseUrl) !== -1) {
      return next.handle(request).pipe(
        catchError((error) => {
          if (!this.successHttpCodes.includes(error.status)) {
            this.notificationService.showNotification(
              NotificationVerticalPosition.Top,
              NotificationHorizontalPosition.Center,
              error.error,
              NotificationTypes.Danger
            );
          }

          return of(error);
        })
      );
    }

    return next.handle(request);
  }
}
