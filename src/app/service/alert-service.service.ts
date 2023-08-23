import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertServiceService {

  constructor(private alertController: AlertController) {}

  async presentAlert(message: string,header?:string) {
    const alert = await this.alertController.create({
      header: header? header :'Erreur',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
