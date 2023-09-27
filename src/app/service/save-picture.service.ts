import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Capacitor, CapacitorHttp, HttpOptions } from '@capacitor/core';
import { Observable } from 'rxjs';
import { Photo } from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Camera, CameraResultType,CameraSource } from '@capacitor/camera';
import { FileUploadServiceService } from './file-upload-service.service';
import { AuthstorageService } from './authstorage.service';

export interface UserPhoto {
  filepath: any
  webviewPath: any
}

@Injectable({
  providedIn: 'root'
})
export class SavePictureService {
  photos : Array <UserPhoto> = new Array<UserPhoto>()
  constructor( private fileUploadService : FileUploadServiceService , 
    private storageService : AuthstorageService ,) { }


  convertBlobToBase64(blob: Blob) {
     return  new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(blob);
    })
  }

  async takePhoto3() {
    const options = {
      resultType: CameraResultType.Uri
    };

    const originalPhoto = await Camera.getPhoto(options);
    // const photoInTempStorage = await Filesystem.readFile({ path: originalPhoto.path });
    const photoInTempStorage = await Filesystem.readFile({path : originalPhoto.path as any });
    // const token : any = await this.storageService.getToken();
    // await this.fileUploadService.sendPhotoDouble2(originalPhoto.path,'' as any,token)
    // let file = new File(originalPhoto.path)
    let date = new Date(),
      time = date.getTime(),
      fileName = time + ".jpeg";

    await Filesystem.writeFile({
      data: photoInTempStorage.data,
      path: fileName,
      directory: Directory.Data
    });

    const finalPhotoUri = await Filesystem.getUri({
      directory: Directory.Data,
      path: fileName
    });

    let photoPath = Capacitor.convertFileSrc(finalPhotoUri.uri);
    console.log(finalPhotoUri);
    console.log(photoPath);
  }


  async takePhoto() {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });

    const fileName = Date.now() + '.jpeg';
    const savedFileImage = await this.savePicture(photo, fileName);

    this.photos.push(savedFileImage);
    console.log(this.photos)
   const myfile = await Filesystem.readFile({path : savedFileImage.filepath , directory : Directory.Data })
   console.log('myfile',myfile)
  }

  async savePicture(photo: Photo, fileName: string): Promise<UserPhoto> {
    // Fetch the photo, read as a blob, then convert to base64 format
    // await CapacitorHttp.get({
    //  url : photo.webPath!,
    //  responseType : "blob"
    // })
    let webPath : any = photo.webPath
    const response = await fetch(webPath.replace('localhost','10.0.2.2')!);
    // const response : any = await CapacitorHttp.get({ url : photo.webPath!,responseType : "blob"})
    console.log(response)
    const blob = await response.blob();
    const base64Data = (await this.convertBlobToBase64(blob)) as string;

    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    });

    // Use webPath to display the new image instead of base64 since it's
    // already loaded into memory
    return {
      filepath: fileName,
      webviewPath: photo.webPath,
    };
  };

}
