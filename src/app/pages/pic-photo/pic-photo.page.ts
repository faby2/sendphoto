import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-pic-photo',
  templateUrl: './pic-photo.page.html',
  styleUrls: ['./pic-photo.page.scss'],
})
export class PicPhotoPage {

  name: string = '';

  constructor(
    private modalCtrl: ModalController,
    private navCtrl : NavController
    ) {}
  // ngOnInit(): void {
  //   throw new Error('Method not implemented.');
  // }

  // cancel() {
  //   return this.modalCtrl.dismiss(null, 'cancel');
  // }

  // confirm() {
  //   return this.modalCtrl.dismiss(this.name, 'confirm');
  // }
  goToHome() {
    this.navCtrl.navigateForward('/doublephotos')
  }

}
