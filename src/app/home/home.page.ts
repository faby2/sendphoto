import { Component } from '@angular/core';
import { IonicSlides, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor( private navCtrl : NavController ) {}

  navToLogin() {
    this.navCtrl.navigateForward('/login');
  }

}
