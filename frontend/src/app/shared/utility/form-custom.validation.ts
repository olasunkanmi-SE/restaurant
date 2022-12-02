import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  FormControl,
} from '@angular/forms';
import { form } from 'src/app/configs/constants';

export class FormCustomValidation {
  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;
      const valid = regex.test(control.value);
      return valid ? null : error;
    };
  }

  static passwordMatchValidator(control: FormControl) {
    const password = control.get(form.password)?.value;
    const confirmPassword = control.get(form.confirmPassword)?.value;
    if (password !== confirmPassword)
      control.get(form.confirmPassword)?.setErrors({ misMatch: true });
  }
}
