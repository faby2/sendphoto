import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-form-picture',
  templateUrl: './form-picture.component.html',
  styleUrls: ['./form-picture.component.scss'],
})
export class FormPictureComponent implements OnInit {
  takeimage : any = ''
  name: string = '';
  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams
    ) {}

  ngOnInit(): void {
    this.takeimage = this.navParams.get('imagePath')
    console.log('Données reçues dans le modal :', this.takeimage);
  }
  // ngOnInit(): void {
  //   throw new Error('Method not implemented.');
  // }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }

  getUrl(image:any) {
    console.log(image)
  }

  async showModalAdd(show:boolean) {
    // const modal = await this.modalCtrl.create({
    //   component: FormPictureComponent,
    //   // componentProps: {
    //   //   // Ici, vous pouvez passer vos données à FormPictureComponent
    //   //   imagePath: 'imagePath',
    //   //   type : 'type'
    //   // }
    // });
    // modal.present();

    // const { data, role } = await modal.onWillDismiss();

    // if (role === 'confirm') {
    //   // this.message = `Hello, ${data}!`;
    // }
  }

}
