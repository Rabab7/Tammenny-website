import { Component } from '@angular/core';
import { NavMain } from "../../components/mainComponents/nav-main/nav-main";
import { Home } from "../../components/mainComponents/home/home";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-main-component',
  imports: [NavMain, RouterOutlet],
  templateUrl: './main-component.html',
  styleUrl: './main-component.css',
})
export class MainComponent {

}
