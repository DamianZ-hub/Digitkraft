import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import {
  NotificationHorizontalPosition,
  NotificationService,
  NotificationTypes,
  NotificationVerticalPosition,
} from "app/shared/services/notification-service.service";
import { ILoginUserDTO } from "app/shared/services/rest-client-dtos/ILoginUserDTO";
import { RestClientService } from "app/shared/services/rest-client.service";
import { data } from "jquery";
import { catchError, of, take, tap } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["../auth.scss"],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
  });

  constructor(
    private readonly router: Router,
    private readonly client: RestClientService,
    private readonly notificationService: NotificationService
  ) {}

  ngOnInit(): void {}

  goToRegister(): void {
    this.router.navigateByUrl("/register");
  }

  login(): boolean | void {
    if (!this.canSubmit()) {
      return false;
    }

    this.client
      .login(this.loginForm.getRawValue() as ILoginUserDTO)
      .pipe(
        take(1),
        tap((data) => {
          localStorage.setItem(
            "userName",
            this.loginForm.get("username").value
          );
          localStorage.setItem("sessionId", data.sessionId);
          this.router.navigateByUrl("");
        }),
        catchError((error) => {
          this.notificationService.showNotification(
            NotificationVerticalPosition.Top,
            NotificationHorizontalPosition.Center,
            "An error occurred while logging in",
            NotificationTypes.Danger
          );
          return of(error);
        })
      )
      .subscribe();
  }

  canSubmit(): boolean {
    return this.loginForm.valid;
  }
}
