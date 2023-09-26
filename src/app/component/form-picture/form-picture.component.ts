import { Component, OnInit, ViewChild } from '@angular/core';
import { IonAccordionGroup, ModalController, NavParams } from '@ionic/angular';
import { AuthstorageService } from 'src/app/service/authstorage.service';
import { FileUploadServiceService } from 'src/app/service/file-upload-service.service';
import { LoadingService } from 'src/app/service/loading.service';
import { MyHttpServiceService } from 'src/app/service/my-http-service.service';
import { I_picture } from 'src/app/utils/interfaces/I_picture';

@Component({
  selector: 'app-form-picture',
  templateUrl: './form-picture.component.html',
  styleUrls: ['./form-picture.component.scss'],
})
export class FormPictureComponent implements OnInit {
  @ViewChild('accordionGroup', { static: true }) accordionGroup: IonAccordionGroup;
  takeimage1 : File | any = ''
  takeimage2 : File | any = ''
  image1 : any 
  image2 : any
  name: string = '';
  checkchoise : any =  {
    header: 'TYPES DE PHOTOS',
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
    ],
  }

  doublephotosdata :any = {
    date: '' ,
    repas: '',
    envoie: ''
  }
  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private loadingService: LoadingService,
    private httpService : MyHttpServiceService,
    private fileupload : FileUploadServiceService,
    private storageService : AuthstorageService
    ) {}

  ngOnInit(): void {
    // this.takeimage = this.navParams.get('imagePath')
    // console.log('Données reçues dans le modal :', this.takeimage);
    this.setDefaultDate()
  }

  setDefaultDate() {
    const date = new Date();
    this.doublephotosdata.date = date.toISOString();
  }
  // ngOnInit(): void {
  //   throw new Error('Method not implemented.');
  // }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async confirm() {
    let loading = await this.loadingService.presentLoading()
    
    const token : any = await this.storageService.getToken();
    this.fileupload.sendPhotoDouble(this.image1.base64String ,this.image2,token).then(async (response)=>{
     await loading.dismiss()
      console.log('response',JSON.stringify(response))
    }).catch(async(error)=>{
      await loading.dismiss()
      console.log('error',JSON.stringify(error))
    })
    // return this.modalCtrl.dismiss(this.name, 'confirm');
  }

  getUrl(image: I_picture) {
    console.log(image)
    const nativeEl = this.accordionGroup;

    if(image.type == 'before') {
      this.takeimage1 = image.imageUrl;
      this.image1 = image
      nativeEl.value = 'first'
    }else {
      this.takeimage2 = image.imageUrl
      this.image2 = image
      nativeEl.value = 'second'
    }
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
