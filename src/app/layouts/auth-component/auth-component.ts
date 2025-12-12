import { Component } from '@angular/core';
import { NavAuth } from "../../components/authComponents/nav-auth/nav-auth";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-component',
  imports: [NavAuth, RouterOutlet],
  templateUrl: './auth-component.html',
  styleUrl: './auth-component.css',
})
export class AuthComponent {

}
