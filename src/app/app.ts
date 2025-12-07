import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterComponent } from "./components/authComponents/register-component/register-component";
import { LoginComponent } from "./components/authComponents/login-component/login-component";

@Component({
  selector: 'app-root',
  imports: [ RegisterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Tammenny');
}
