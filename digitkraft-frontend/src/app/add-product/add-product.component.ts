import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {
  NotificationHorizontalPosition,
  NotificationService,
  NotificationTypes,
  NotificationVerticalPosition,
} from "app/shared/services/notification-service.service";
import { IAddProductDto } from "app/shared/services/rest-client-dtos/IAddProductDto";
import { ICategoryDto } from "app/shared/services/rest-client-dtos/ICategoryDto";
import { IProductDto } from "app/shared/services/rest-client-dtos/IProductDto";
import { RestClientService } from "app/shared/services/rest-client.service";
import { catchError, of, tap } from "rxjs";

@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.scss"],
})
export class AddProductComponent implements OnInit {
  selectedFileBase64: string | ArrayBuffer;
  selectedFileName: string;
  categoriesPartOne: Array<ICategoryDto> = [];
  categoriesPartTwo: Array<ICategoryDto> = [];
  selectedCategories: Array<string> = [];
  selectedCatttt: ICategoryDto;
  loading = false;

  productForm = new FormGroup({
    name: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    price: new FormControl("", [
      Validators.required,
      Validators.pattern(/^\d{0,8}(.\d{1,2})?$/),
    ]),
  });

  constructor(
    private readonly client: RestClientService,
    private readonly notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  submit(): void {
    const formControls = this.productForm.controls;
    const categories = this.selectedCatttt.name;
    const product = {
      name: formControls.name.value,
      description: formControls.description.value,
      price: formControls.price.value,
      category: categories,
      base64Content: this.selectedFileBase64,
      fileName: this.selectedFileName,
    } as IAddProductDto;

    this.loading = true;
    this.client
      .addProduct(product)
      .pipe(
        tap((data) => {
          this.notificationService.showNotification(
            NotificationVerticalPosition.Top,
            NotificationHorizontalPosition.Center,
            "Product added",
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

  canSubmit(): boolean {
    return (
      this.productForm.valid &&
      !!this.selectedCatttt &&
      !!this.selectedFileBase64
    );
  }

  selectCategory(category: ICategoryDto): void {
    const categoryName = category.name;
    // const categoryAlreadyExists = this.selectedCategories.find(
    //   (x) => x === categoryName
    // );

    // if (!!categoryAlreadyExists) {
    //   this.selectedCategories = this.selectedCategories.filter(
    //     (x) => x !== categoryName
    //   );
    // } else {
    //this.selectedCategories.push(categoryName);
    //}
    this.selectedCatttt = category;
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", (event: any) => {
      this.selectedFileName = file.name;
      this.selectedFileBase64 = reader.result;
    });

    reader.readAsDataURL(file);
  }

  private getCategories(): void {
    this.loading = true;
    this.client.getCategories().subscribe((categories) => {
      const middleIndex = Math.ceil(categories.length / 2);

      this.categoriesPartOne = categories.splice(0, middleIndex);
      this.categoriesPartTwo = categories.splice(-middleIndex);
      this.loading = false;
    });
  }
}
