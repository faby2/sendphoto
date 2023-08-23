import { Component, OnInit } from '@angular/core';
import { FileUploadServiceService } from '../../service/file-upload-service.service'
import { catchError } from 'rxjs';
import { AlertServiceService } from 'src/app/service/alert-service.service';
import { AuthstorageService } from 'src/app/service/authstorage.service';

@Component({
  selector: 'app-doublephotos',
  templateUrl: './doublephotos.page.html',
  styleUrls: ['./doublephotos.page.scss'],
})
export class DoublephotosPage implements OnInit {

  selectedFile: File | undefined;
  token: any;

  constructor(
    private fileUploadService: FileUploadServiceService,
    private alertService : AlertServiceService,
    private storageService : AuthstorageService
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
  }

}
