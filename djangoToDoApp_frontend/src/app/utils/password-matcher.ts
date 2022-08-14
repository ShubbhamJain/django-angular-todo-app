import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

export const passwordMatchingValidatior: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const passwordControl = control.get('password1')
  const confirmPasswordControl = control.get('password2')

  if (passwordControl?.pristine || confirmPasswordControl?.pristine) {
    return null
  }

  if (passwordControl?.value === confirmPasswordControl?.value) {
    return null
  }

  if (passwordControl?.value !== confirmPasswordControl?.value) {
    confirmPasswordControl?.setErrors({ notmatched: true })
  }

  return null
}
