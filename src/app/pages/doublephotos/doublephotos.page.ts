import { Component, OnInit } from '@angular/core';
import { FileUploadServiceService } from '../../service/file-upload-service.service'
import { catchError } from 'rxjs';
import { AlertServiceService } from 'src/app/service/alert-service.service';
import { AuthstorageService } from 'src/app/service/authstorage.service';
import { InfiniteScrollCustomEvent, ModalController, NavController } from '@ionic/angular';
import { I_photoItem } from 'src/app/interface/photostorage';
import { PicPhotoPage } from '../pic-photo/pic-photo.page';
import { TakePictureComponent } from 'src/app/component/take-picture/take-picture.component';

@Component({
  selector: 'app-doublephotos',
  templateUrl: './doublephotos.page.html',
  styleUrls: ['./doublephotos.page.scss'],
})
export class DoublephotosPage implements OnInit {

  selectedFile: File | undefined;
  token: any;
  items: I_photoItem[] = [];
  message = 'This modal example uses the modalController to present and dismiss modals.';

  constructor(
    private fileUploadService: FileUploadServiceService,
    private alertService : AlertServiceService,
    private storageService : AuthstorageService,
    private modalCtrl: ModalController,
    private navCtrl : NavController
    ) {}

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    if (this.selectedFile) {
      this.fileUploadService.uploadFile(this.selectedFile, this.token).pipe(
        catchError((error) => {
          let errorMessage = 'Erreur lors de l\'envoi du fichier';
          if (error.status === 401) {
            errorMessage = 'Erreur lors de l\'envoi du fichier';
          }
          console.log(errorMessage)
          this.alertService.presentAlert(errorMessage, 'Erreur')
          throw error;
        })
      ).subscribe(
        (response) => {
          console.log('Fichier envoyé avec succès :', response);
        }
      );
    }
  }

  ngOnInit() {
    this.token = this.storageService.getToken()
    this.generateItems();
  }

  private generateItems() {
    const count  = this.items.length + 1;
    // let send : boolean = true;
    for (let i : number = 0; i < 50; i++) {
      let photo_temp : I_photoItem = {
        name: `Item ${count + i}`,
        date : new Date(),
        send : (i%2) == 0 ? true : false
      }
      this.items.push(photo_temp);
    }
  }

  onIonInfinite(ev : any) {
    this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      // component: TakePictureComponent,
      component: PicPhotoPage,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }
  }

  navToPicPhoto() {
    this.navCtrl.navigateForward('/pic-photo')
  }

}
