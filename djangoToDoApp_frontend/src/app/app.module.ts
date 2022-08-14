import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { LoginComponent } from './components/login/login.component'
import { TodosComponent } from './components/todos/todos.component'
import { ButtonComponent } from './components/button/button.component'
import { HeaderComponent } from './components/header/header.component'
import { FooterComponent } from './components/footer/footer.component'
import { AddTodoComponent } from './components/add-todo/add-todo.component'
import { RegisterComponent } from './components/register/register.component'
import { TodoItemComponent } from './components/todo-item/todo-item.component'
import { EditTodoComponent } from './components/edit-todo/edit-todo.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ButtonComponent,
    AddTodoComponent,
    TodosComponent,
    TodoItemComponent,
    FooterComponent,
    EditTodoComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
