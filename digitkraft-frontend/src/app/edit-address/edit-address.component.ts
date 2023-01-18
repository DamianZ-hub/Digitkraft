import {Component, OnInit} from "@angular/core";
import {RestClientService} from "../shared/services/rest-client.service";
import {
    NotificationHorizontalPosition,
    NotificationService, NotificationTypes,
    NotificationVerticalPosition
} from "../shared/services/notification-service.service";
import {Router} from "@angular/router";
import {CartService} from "../shared/services/cart.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {catchError, of, take, tap} from "rxjs";

@Component({
    selector: "app-edit-address",
    templateUrl: "./edit-address.component.html",
    styleUrls: ["./edit-address.component.scss"],
})
export class EditAddressComponent implements OnInit {

    loading: boolean = false

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
        private readonly router: Router,
        readonly cart: CartService,
    ) {
    }

    ngOnInit(): void {
        this.loading = true
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
        this.loading = true
        const formControls = this.addressForm.controls;
        const address = {
            country: formControls.country.value,
            region: formControls.region.value,
            city: formControls.city.value,
            postCode: formControls.postcode.value,
            street: formControls.street.value,
            house: formControls.house.value,
            apartment: formControls.apartment.value
        }
        this.client
            .editAddress(address)
            .pipe(
                tap((data) => {
                    this.notificationService.showNotification(
                        NotificationVerticalPosition.Top,
                        NotificationHorizontalPosition.Center,
                        "Address was modified",
                        NotificationTypes.Success
                    );
                    this.loading = false;
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
