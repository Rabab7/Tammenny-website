import { Component } from '@angular/core';
import { NavDoctorComponent } from "../../../../components/mainComponents/doctorComponents/nav-doctor-component/nav-doctor-component";
import { FooterComponent } from "../../../../components/footer/footer-component/footer-component";
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-doctor-layout',
  imports: [NavDoctorComponent, FooterComponent, RouterOutlet],
  templateUrl: './doctor-layout.html',
  styleUrl: './doctor-layout.css',
})
export class DoctorLayout {

}
