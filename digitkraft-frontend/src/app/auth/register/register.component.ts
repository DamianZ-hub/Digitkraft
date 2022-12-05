import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ValidationHelpers } from "app/shared/helpers/validation-helpers";
import {
  NotificationHorizontalPosition,
  NotificationService,
  NotificationTypes,
  NotificationVerticalPosition,
} from "app/shared/services/notification-service.service";
import { RestClientService } from "app/shared/services/rest-client.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["../auth.scss", "./register.component.scss"],
})
export class RegisterComponent implements OnInit, OnDestroy {
  private passwordChangeSubscription: Subscription;

  registerForm = new FormGroup({
    username: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(50),
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(50),
    ]),
    repeatPassword: new FormControl("", [
      Validators.required,
      ValidationHelpers.matchValues("password"),
    ]),
    email: new FormControl("", [
      Validators.email,
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(50),
    ]),
  });

  constructor(
    private readonly client: RestClientService,
    private readonly router: Router,
    private readonly notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.passwordChangeSubscription =
      this.registerForm.controls.password.valueChanges.subscribe(() =>
        this.registerForm.controls.repeatPassword.updateValueAndValidity()
      );
  }

  ngOnDestroy(): void {
    this.passwordChangeSubscription.unsubscribe();
  }

  register(): boolean | void {
    if (!this.canSubmit) {
      return false;
    }

    this.client.register(this.registerForm.getRawValue()).subscribe((data) => {
      this.notificationService.showNotification(
        NotificationVerticalPosition.Top,
        NotificationHorizontalPosition.Center,
        data,
        NotificationTypes.Success
      );

      this.router.navigateByUrl("/login");
    });
  }

  canSubmit(): boolean {
    return this.registerForm.valid;
  }
}
