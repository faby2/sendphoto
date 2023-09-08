import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-form-picture',
  templateUrl: './form-picture.component.html',
  styleUrls: ['./form-picture.component.scss'],
})
export class FormPictureComponent {
  takeimage : any = ''
  name: string = '';
  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams
    ) {}
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
