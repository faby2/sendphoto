import { Component, OnInit } from '@angular/core';
import { IonicSlides, NavController } from '@ionic/angular';


@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {


  constructor( private navCtrl : NavController ) {}
  ngOnInit(): void {
  }

  navToLogin() {
    this.navCtrl.navigateForward('/login');
  }

}
