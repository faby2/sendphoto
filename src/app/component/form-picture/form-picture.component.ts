import { Component, OnInit, ViewChild } from '@angular/core';
import { IonAccordionGroup, ModalController, NavParams } from '@ionic/angular';
import { AuthstorageService } from 'src/app/service/authstorage.service';
import { FileUploadServiceService } from 'src/app/service/file-upload-service.service';
import { LoadingService } from 'src/app/service/loading.service';
import { MyHttpServiceService } from 'src/app/service/my-http-service.service';
import { I_picture } from 'src/app/utils/interfaces/I_picture';
import { Filesystem } from '@capacitor/filesystem';
import { SavePictureService } from 'src/app/service/save-picture.service';

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
    private storageService : AuthstorageService ,
    private  savePictureService: SavePictureService
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
    await this.savePictureService.takePhoto()
  }

  // async confirm() {
  //   let loading = await this.loadingService.presentLoading()

  //   const token : any = await this.storageService.getToken();
  //   const file: any = await this.convertBlogToFile(this.image1)
  //   // this.fileupload.sendPhotoDouble(this.image1 ,this.image2,token).then(async (response)=>{
  //   console.log('eto')
  //   // debugger
  //   this.fileupload.sendPhotoDouble(file ,this.image2,token).then(async (response)=>{

  //    await loading.dismiss()
  //     console.log('response',JSON.stringify(response))
  //   }).catch(async(error)=>{
  //     await loading.dismiss()
  //     console.log('error',JSON.stringify(error))
  //   })
  //   // return this.modalCtrl.dismiss(this.name, 'confirm');
  // }

  blobToFile(blob : any, fileName: any, mimeType:any) {
    const options = { type: mimeType };
    const file = new File([blob], fileName, options);
    return file;
  }

  async  blobUriToFile(blobUri : any) {
    try {
      const path = decodeURIComponent(blobUri).replace("http://localhost", ""); // Supprimer la partie "http://localhost"
      const fileContent = await Filesystem.readFile({
        path: path
      });

      // fileContent est maintenant le contenu du fichier sous forme de ArrayBuffer ou chaîne (selon le type de fichier)

      return fileContent;
    } catch (error) {
      console.error("Erreur :", error);
      throw error;
    }
  }

  async convertBlogToFile(image : I_picture) {
    const blobUrl = image.imageUrl;
    return this.blobUriToFile(blobUrl)
    // const fileName = 'example.png'; // Set the desired filename
    // const mimeType = 'text/plain'; // Set the desired MIME type
    // console.log('bobURL',blobUrl)
    // console.log('bobURL',encodeURI (blobUrl))
    // const response = await fetch(encodeURI (blobUrl));
    // const blobData = await response.blob();
    // const file = this.blobToFile(blobData, fileName, mimeType);
    // console.log('File created:', file);
    // return file
  }

  async getUrl(image: I_picture) {
    console.log('image',encodeURI(image.imageUrl))

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
