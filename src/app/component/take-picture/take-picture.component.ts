import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionSheetController, IonicSlides, ModalController, NavController } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Router } from '@angular/router';
type Photo = "double" | "simple"

@Component({
  selector: 'app-take-picture',
  templateUrl: './take-picture.component.html',
  styleUrls: ['./take-picture.component.scss'],
})
export class TakePictureComponent   {

  @Output() getUrl = new EventEmitter<string>()
  @Output() showAddPage = new EventEmitter<boolean>()
  @Input() ispict : boolean
  imageUrl: string | undefined;
  checkchoise : any =  {
    header: 'TYPES DE PHOTOS',
    buttons: [
      {
        text: 'Double photos',
        role: 'double',
        data: {
          action: 'delete',
        },
      },
      {
        text: 'Photos de moi',
        role: 'simple',
        data: {
          action: 'share',
        },
      },
      {
        text: 'ANNULER',
        role: 'cancel',
        data: {
          action: 'cancel',
        },
      },
    ],
  }

  constructor(
    private navCtrl : NavController ,private actionSheetCtrl: ActionSheetController,
    private router: Router,
    private modalCtrl: ModalController
    ) {}

  // navToLogin() {
  //   this.navCtrl.navigateForward('/login');
  // }

  // navToDoublePhoto(imagePath?:any) {
  //   // console.log('fsdf')
  //   if(imagePath)
  //     this.navCtrl.navigateForward('/doublephotos',{ state: { photo: imagePath } });
  //   else
  //     this.navCtrl.navigateForward('/doublephotos');
  //   // imagePath
  //   // this.router.navigate(['/doublephotos']);
  //   // this.navCtrl.navigateForward('/page-b', { state: { photo: photoData } });
  // }

  // navToPhotoFormular(imagePath?:any) {
  //   // console.log('fsdf')
  //   if(imagePath)
  //     this.navCtrl.navigateForward('/doublephotos',{ state: { photo: imagePath } });
  //   else
  //     this.navCtrl.navigateForward('/doublephotos');
  //   // imagePath
  //   // this.router.navigate(['/doublephotos']);
  //   // this.navCtrl.navigateForward('/page-b', { state: { photo: photoData } });
  // }

  
  async add() {
    this.showAddPage.emit(true)
  }

  async takePicture() {
    // console.log('bonjour')
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
    this.imageUrl = image.webPath;
    this.getUrl.emit(this.imageUrl)
    // this.presentActionSheet(image.webPath)
  }

  // async presentActionSheet(imagePath?:any) {
  //   const actionSheet = await this.actionSheetCtrl.create(this.checkchoise);

  //   await actionSheet.present();

  //   actionSheet.onDidDismiss().then((result) => {
  //     // result est un objet contenant les données de l'action sélectionnée
  //     if (result.role === 'double') {
  //       console.log('double');
  //       this.openModal(imagePath, "double");
  //     } else if (result.role === 'simole') {
  //       console.log('simple');
  //     } else {
  //       console.log('annuler');
  //     }
  //     console.log('Données:', result.data);
  //   });

  // }

  // async openModal(imagePath:string, type: Photo) {
  //   const modal = await this.modalCtrl.create({
  //     component: FormPictureComponent,
  //     componentProps: {
  //       // Ici, vous pouvez passer vos données à FormPictureComponent
  //       imagePath: imagePath,
  //       type : type
  //     }
  //   });
  //   modal.present();

  //   const { data, role } = await modal.onWillDismiss();

  //   if (role === 'confirm') {
  //     // this.message = `Hello, ${data}!`;
  //   }
  // }
}

