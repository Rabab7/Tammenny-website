import { Component } from '@angular/core';
import { NavMain } from "../../components/mainComponents/nav-main/nav-main";
import { RouterOutlet } from "@angular/router";
import { FooterComponent } from "../../components/footer/footer-component/footer-component";

@Component({
  selector: 'app-main-component',
  imports: [NavMain, RouterOutlet, FooterComponent],
  templateUrl: './main-component.html',
  styleUrl: './main-component.css',
})
export class MainComponent {

}
