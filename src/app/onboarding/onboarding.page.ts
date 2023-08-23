import { Component, OnInit } from '@angular/core';
import { IonicSlides, NavController } from '@ionic/angular';
import { AuthstorageService } from '../service/authstorage.service';


@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit {


  constructor(
    private navCtrl : NavController,
    private storageService : AuthstorageService
    ) {}
  ngOnInit(): void {

  }

  navToLogin() {
    this.storageService.isLoggedIn().then(()=>{
      this.navCtrl.navigateForward('/home')
    }).catch(()=>{
      this.navCtrl.navigateForward('/login');
    })
  }

}
