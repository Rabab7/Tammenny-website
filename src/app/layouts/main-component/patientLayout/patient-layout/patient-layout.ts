import { Component } from '@angular/core';
import { FooterComponent } from "../../../../components/footer/footer-component/footer-component";
import { NavMain } from "../../../../components/mainComponents/patientComponents/nav-main/nav-main";
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-patient-layout',
  imports: [FooterComponent, NavMain, RouterOutlet],
  templateUrl: './patient-layout.html',
  styleUrl: './patient-layout.css',
})
export class PatientLayout {

}
