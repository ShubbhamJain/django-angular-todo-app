import { Router } from '@angular/router'
import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

import { authBackendRes } from 'src/app/interfaces'
import { AuthService } from 'src/app/services/auth.service'
import { passwordMatchingValidatior } from '../../utils/password-matcher'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  title = 'ToDo App Register'
  registerForm!: FormGroup
  displayMessage = {
    username: 'User Name is required',
    email: 'This email is invalid',
    password1: 'The password length must be greater than or equal to 8',
    password2: 'Passwords do not match'
  }

  log(val: any) {
    console.log(val)
  }

  // eslint-disable-next-line no-useless-constructor
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup(
      {
        username: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
        ]),
        password1: new FormControl(null, [
          Validators.required,
          Validators.minLength(8)
        ]),
        password2: new FormControl(null, [Validators.required])
      },
      { validators: passwordMatchingValidatior }
    )
  }

  onSubmit() {
    try {
      const newUser = {
        username: this.registerForm.value.username,
        email: this.registerForm.value.email,
        password1: this.registerForm.value.password1,
        password2: this.registerForm.value.password2
      }

      this.authService.register(newUser).subscribe((data: authBackendRes) => {
        if (data.success) {
          const response = this.authService.setToken(data.token)
          if (response) {
            this.router.navigate(['/'])
          }
        } else {
          const errors: {
            username?: [{ code: string; message: string }]
            email?: [{ code: string; message: string }]
            password1?: [{ code: string; message: string }]
            password2?: [{ code: string; message: string }]
          } = JSON.parse(data.errors)

          Object.keys(errors).forEach((key) => {
            if (key === 'password1' || key === 'password2') {
              this.registerForm.controls[key]?.setErrors({ minlength: true })
              if (key === 'password1') {
                this.displayMessage.password1 = errors.password1?.[0].message!
              } else {
                this.displayMessage.password2 = errors.password2?.[0].message!
              }
            } else {
              this.registerForm.controls[key].setErrors({ email: true })
              this.displayMessage.email = errors.email?.[0].message!
            }
          })
        }
      })
    } catch (error) {
      this.log(error)
    }
  }
}
