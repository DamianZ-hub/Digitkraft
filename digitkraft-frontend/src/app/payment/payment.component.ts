import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.scss"],
})
export class PaymentComponent implements OnInit {
  orderCode: string;

  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    this.orderCode = this.route.snapshot.paramMap.get("code");
  }
}
