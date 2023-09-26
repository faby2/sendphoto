import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionSheetController, IonicSlides, ModalController, NavController } from '@ionic/angular';
import { Camera, CameraResultType,CameraSource } from '@capacitor/camera';
import { Router } from '@angular/router';
import { I_picture } from 'src/app/utils/interfaces/I_picture';
type Photo = "double" | "simple"

@Component({
  selector: 'app-take-picture',
  templateUrl: './take-picture.component.html',
  styleUrls: ['./take-picture.component.scss'],
})
export class TakePictureComponent   {

  @Output() getUrl = new EventEmitter<I_picture>()
  @Output() showAddPage = new EventEmitter<boolean>() 
  @Input() ispict : boolean
  imageUrl: string | undefined;
  // checkchoise : any =  {
  //   header: 'TYPES DE PHOTOS',
  //   buttons: [
  //     {
  //       text: 'Double photos',
  //       role: 'double',
  //       data: {
  //         action: 'delete',
  //       },
  //     },
  //     {
  //       text: 'Photos de moi',
  //       role: 'simple',
  //       data: {
  //         action: 'share',
  //       },
  //     },
  //     {
  //       text: 'ANNULER',
  //       role: 'cancel',
  //       data: {
  //         action: 'cancel',
  //       },
  //     },
  //   ],
  // }

  checkchoise : any =  {
    header: 'TYPE DE PHOTO',
    buttons: [
      {
        text: 'Avant',
        role: 'before',
        data: {
          action: 'avant',
        },
      },
      {
        text: 'Aprés',
        role: 'after',
        data: {
          action: 'share',
        },
      },
      {
        text: 'Retour',
        role: 'cancel',
        data: {
          action: 'cancel',
        },
      },
    ]
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
    const actionSheet = await this.actionSheetCtrl.create(this.checkchoise);

    await actionSheet.present();

    const { data, role } = await actionSheet.onWillDismiss();

    if (role === 'before' || role === 'after') {
      await this.runCamera(role)
    }


    // this.presentActionSheet(image.webPath)
  }

  async runCamera(type : "before" | "after"){

    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri ,
      // resultType: CameraResultType.DataUrl ,
      source: CameraSource.Camera,
      // resultType: CameraResultType.Base64
      
    });
    console.log(image)
    this.imageUrl = image.webPath;
    // this.imageUrl = image.base64String;
    this.getUrl.emit( 
      {
        imageUrl : this.imageUrl,
        type : type,
        image : image
      } 
    )
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

