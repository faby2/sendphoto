import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-take-picture',
  templateUrl: './take-picture.component.html',
  styleUrls: ['./take-picture.component.scss'],
})
export class TakePictureComponent   {

  name: string = '';

  constructor(private modalCtrl: ModalController) {}
  // ngOnInit(): void {
  //   throw new Error('Method not implemented.');
  // }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }
}
