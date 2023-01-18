import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {
    NotificationHorizontalPosition,
    NotificationService, NotificationTypes,
    NotificationVerticalPosition
} from "../shared/services/notification-service.service";
import {RestClientService} from "../shared/services/rest-client.service";
import {catchError, of, tap} from "rxjs";


@Component({
    selector: "payment",
    templateUrl: "./payment.component.html",
    styleUrls: ["./payment.component.scss"],
})
export class PaymentComponent implements OnInit {

    orderCode: string;
    loading: boolean = false

    constructor(
        private readonly router: Router,
        private readonly route: ActivatedRoute,
        private readonly client: RestClientService,
        private readonly notificationService: NotificationService) {
    }

    ngOnInit(): void {
        this.orderCode = this.route.snapshot.paramMap.get('code');
    }

    processPayment(event): void {
        this.loading = true
        if (this.validatePayment(event)) {
            this.client
                .payForProduct(this.orderCode)
                .pipe(
                    tap((data) => {
                        this.notificationService.showNotification(
                            NotificationVerticalPosition.Top,
                            NotificationHorizontalPosition.Center,
                            data,
                            NotificationTypes.Success
                        );
                        this.loading = false;
                        this.router.navigateByUrl('/productList')
                    }),
                    catchError((error) => {
                        this.loading = false;
                        this.notificationService.showNotification(
                            NotificationVerticalPosition.Top,
                            NotificationHorizontalPosition.Center,
                            "An error occured",
                            NotificationTypes.Danger
                        );

                        return of(error);
                    })
                )
                .subscribe();
        }
    }

    validatePayment(creditCardData): boolean {
        if (!creditCardData.cardNumber) {
            this.notificationService.showNotification(
                NotificationVerticalPosition.Top,
                NotificationHorizontalPosition.Center,
                "You must input the card number",
                NotificationTypes.Danger
            );
            return false
        }
        if (!creditCardData.cardHolder) {
            this.notificationService.showNotification(
                NotificationVerticalPosition.Top,
                NotificationHorizontalPosition.Center,
                "You must input your first and last name",
                NotificationTypes.Danger
            );
            return false
        }
        if (!creditCardData.ccv) {
            this.notificationService.showNotification(
                NotificationVerticalPosition.Top,
                NotificationHorizontalPosition.Center,
                "You must input ccv code",
                NotificationTypes.Danger
            );
            return false
        }
        if (!creditCardData.expirationMonth) {
            this.notificationService.showNotification(
                NotificationVerticalPosition.Top,
                NotificationHorizontalPosition.Center,
                "You must input the expiration month",
                NotificationTypes.Danger
            );
            return false
        }
        if (!creditCardData.expirationYear) {
            this.notificationService.showNotification(
                NotificationVerticalPosition.Top,
                NotificationHorizontalPosition.Center,
                "You must input the card expiration year",
                NotificationTypes.Danger
            );
            return false
        }
        return true;
    }

}