import {Component, OnInit} from "@angular/core";
import {RestClientService} from "../shared/services/rest-client.service";
import {
    NotificationHorizontalPosition,
    NotificationService, NotificationTypes,
    NotificationVerticalPosition
} from "../shared/services/notification-service.service";
import {Router} from "@angular/router";
import {CartService} from "../shared/services/cart.service";
import {IOrderDTO} from "../shared/services/rest-client-dtos/IOrderDTO";
import {catchError, of, take, tap} from "rxjs";


@Component({
    selector: "app-all-orders",
    templateUrl: "./all-orders.component.html",
    styleUrls: ["./all-orders.component.scss"],
})
export class AllOrdersComponent implements OnInit {

    userOrders: Array<IOrderDTO> = [];
    loading = false;

    ngOnInit(): void {
        this.loading = true;

        this.client
            .getOrders()
            .pipe(
                take(1),
                tap(
                    (data) => {
                        this.userOrders = data
                        this.loading = false;
                        const orders = JSON.parse(localStorage.getItem("orders"));
                        data.forEach(order => {
                                orders.forEach(storageOrder => {
                                    if (storageOrder.data == order.code) {
                                        order.price = storageOrder.price
                                        console.log(order.price)
                                    }
                                })
                            })
                        this.userOrders = data
                        console.log(this.userOrders[0])

                    },
                    catchError((error) => {
                        this.notificationService.showNotification(
                            NotificationVerticalPosition.Top,
                            NotificationHorizontalPosition.Center,
                            error,
                            NotificationTypes.Success
                        );
                        this.loading = false;
                        return of(error);

                    })
                )
            )
            .subscribe();
    }

    constructor(
        private readonly client: RestClientService,
        private readonly notificationService: NotificationService,
        private readonly router: Router,
        readonly cart: CartService,
    ) {
    }

}