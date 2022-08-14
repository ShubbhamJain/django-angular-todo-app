import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { AuthGuardService } from './services/auth-guard.service'

import { TodosComponent } from './components/todos/todos.component'
import { LoginComponent } from './components/login/login.component'
import { RegisterComponent } from './components/register/register.component'

const routes: Routes = [
  { path: '', component: TodosComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
