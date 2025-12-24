import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterComponent } from "./components/authComponents/register-component/register-component";
import { LoginComponent } from "./components/authComponents/login-component/login-component";
import { AuthComponent } from "./layouts/auth-component/auth-component";
import { NavAuth } from "./components/authComponents/nav-auth/nav-auth";
import { NgxSpinnerComponent } from "ngx-spinner";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Tammenny');
}
