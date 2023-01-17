import {Component, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RestClientService} from "../shared/services/rest-client.service";
import {
    NotificationHorizontalPosition,
    NotificationService, NotificationTypes,
    NotificationVerticalPosition
} from "../shared/services/notification-service.service";
import {catchError, of, take, tap} from "rxjs";
import {IAddOrderDto} from "../shared/services/rest-client-dtos/IAddOrderDto";
import {Router} from "@angular/router";


@Component({
    selector: "app-add-order",
    templateUrl: "./add-order.component.html",
    styleUrls: ["./add-order.component.scss"],
})
export class AddOrderComponent implements OnInit {

    loading: boolean = false;
    orderPrice: number;
    deliveryOptions = [
        {
            name: 'Kurier DTP', price: 10
        },
        {
            name: 'Kurier Inpost', price: 15
        },
        {
            name: 'Poczta Polska', price: 20
        }
    ]
    selectedDeliveryOption = {
        name: '',
        price: 0
    }
    addressForm = new FormGroup({
        country: new FormControl("", Validators.required),
        region: new FormControl("", Validators.required),
        city: new FormControl("", Validators.required),
        postcode: new FormControl("", Validators.required),
        street: new FormControl("", Validators.required),
        house: new FormControl("", Validators.required),
        apartment: new FormControl("", Validators.required),
    });

    constructor(
        private readonly client: RestClientService,
        private readonly notificationService: NotificationService,
        private readonly router: Router
    ) {
    }

    ngOnInit(): void {
        this.selectedDeliveryOption = this.deliveryOptions[0]
        this.client
            .getAllProducts()
            .pipe(
                take(1),
                tap(
                    (data) => {
                        this.orderPrice = data
                            .map(order => order.price)
                            .reduce((acc, currVal) => acc + currVal, 0);
                    },
                    catchError((error) => {
                        this.notificationService.showNotification(
                            NotificationVerticalPosition.Top,
                            NotificationHorizontalPosition.Center,
                            error,
                            NotificationTypes.Success
                        );
                        return of(error);
                    })
                )
            )
            .subscribe();

        this.client
            .getAddress()
            .pipe(
                take(1),
                tap(
                    (data) => {
                        console.log(data)
                        this.addressForm.setValue({
                            country: data.country,
                            region: data.region,
                            city: data.city,
                            postcode: data.postCode,
                            street: data.street,
                            house: data.house,
                            apartment: data.apartment
                        });
                    },
                    catchError((error) => {
                        this.notificationService.showNotification(
                            NotificationVerticalPosition.Top,
                            NotificationHorizontalPosition.Center,
                            error,
                            NotificationTypes.Success
                        );
                        return of(error);
                    })
                )
            )
            .subscribe();
        this.loading = false;
    }

    canSubmit(): boolean {
        return this.addressForm.valid;
    }

    submit(): void {
        this.loading = true;
        const formControls = this.addressForm.controls;
        const order = {
            shipment: {
                name: this.selectedDeliveryOption.name,
                price: this.selectedDeliveryOption.price
            },
            address: {
                country: formControls.country.value,
                region: formControls.region.value,
                city: formControls.city.value,
                postCode: formControls.postcode.value,
                street: formControls.street.value,
                house: formControls.house.value,
                apartment: formControls.apartment.value
            }
        } as IAddOrderDto;

        this.client
            .addOrder(order)
            .pipe(
                tap((data) => {
                    this.notificationService.showNotification(
                        NotificationVerticalPosition.Top,
                        NotificationHorizontalPosition.Center,
                        "Order created",
                        NotificationTypes.Success
                    );
                    this.loading = false;
                    const order = {
                        price: this.selectedDeliveryOption.price + this.orderPrice,
                        data: data
                    }
                    if (localStorage.getItem("orders") === null) {
                        const orders = []
                        orders[0] = order
                        localStorage.setItem("orders", JSON.stringify(orders));
                    } else {
                        const orders = JSON.parse(localStorage.getItem("orders"));
                        orders.push(order);
                        localStorage.setItem("orders", JSON.stringify(orders));
                    }
                    //TODO: Add remove items from item storage !!!!
                    console.log(data)
                    this.router.navigateByUrl('/payment/' + data)
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

    selectDeliveryOption(selectedOption): void {
        this.selectedDeliveryOption = this.deliveryOptions[selectedOption.target.value]
    }
}