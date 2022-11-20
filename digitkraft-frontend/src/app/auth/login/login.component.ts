import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ILoginUserDTO } from "app/shared/services/rest-client-dtos/ILoginUserDTO";
import { RestClientService } from "app/shared/services/rest-client.service";

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
    private readonly client: RestClientService
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
      .subscribe((data) => {
        localStorage.setItem("sessionId", data.sessionId);
        this.router.navigateByUrl("");
      });
  }

  canSubmit(): boolean {
    return this.loginForm.valid;
  }
}
