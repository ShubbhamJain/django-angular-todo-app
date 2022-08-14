import { Router } from '@angular/router'
import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

import { authBackendRes } from 'src/app/interfaces'
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title = 'ToDo App Login'
  loginForm!: FormGroup
  displayMessage = {
    email: 'This email is invalid',
    password: 'The password length must be greater than or equal to 8'
  }

  // eslint-disable-next-line no-useless-constructor
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8)
      ])
    })
  }

  onSubmit() {
    try {
      const user = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      }

      this.authService.login(user).subscribe((data: authBackendRes) => {
        if (data.success) {
          const response = this.authService.setToken(data.token)
          if (response) {
            this.router.navigate(['/'])
          }
        } else {
          const errors: { field: 'email' | 'password'; message: string } =
            data.errors

          if (errors.field === 'email') {
            // eslint-disable-next-line dot-notation
            this.loginForm.controls['email'].setErrors({ email: true })
            this.displayMessage.email = errors.message
          } else {
            // eslint-disable-next-line dot-notation
            this.loginForm.controls['password'].setErrors({ minlength: true })
            this.displayMessage.password = errors.message
          }
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
}
