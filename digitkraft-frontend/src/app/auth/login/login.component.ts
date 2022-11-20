import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { RestClientService } from "app/shared/services/rest-client.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["../auth.scss"],
})
export class LoginComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly client: RestClientService
  ) {}

  ngOnInit(): void {}

  goToRegister(): void {
    this.router.navigateByUrl("/register");
  }

  getExampleData() {
    this.client
      .exampleGet()
      .subscribe((data) => console.log(JSON.stringify(data, null, 2)));
  }
}
