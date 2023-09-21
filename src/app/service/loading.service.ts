import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(private loadingCtrl: LoadingController) {

  }

  async presentLoading(message ? : string,duration ?: number) {
    const loading = await this.loadingCtrl.create({
      message: message ? message : 'Veuillez patienter' ,
      duration: duration ? duration : -1,
    });

    loading.present();
  }

}
