import { AbstractControl, ValidationErrors } from "@angular/forms";

export class ValidationHelpers {
  public static matchValues(
    matchTo: string
  ): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
        !!control.parent.value &&
        control.value === control.parent.controls[matchTo].value
        ? null
        : { isNotMatching: true };
    };
  }
}
