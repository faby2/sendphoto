import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CapacitorHttp, HttpOptions } from '@capacitor/core';
import { Observable } from 'rxjs';
import { Photo } from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Camera, CameraResultType,CameraSource } from '@capacitor/camera';
import {decode} from "base64-arraybuffer";
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
  constructor(
    private fileUploadService : FileUploadServiceService,
    private storageService : AuthstorageService
    ) { }


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

  async takePhoto() {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 100,
    });

    const file =  this.convertToblob(photo)
    const token : any = await this.storageService.getToken()
    this.fileUploadService.sendPhotoDouble2(file, '' as any , token).then(async (response)=>{
    //  await loading.dismiss()
      console.log('response',JSON.stringify(response))
    }).catch(async(error)=>{
      // await loading.dismiss()
      console.log('error',JSON.stringify(error))
    })
    // return this.modalCtrl.dismiss(this.name, 'confirm');

  };

  convertToblob(cameraPhoto64 : Photo) {

    const blob = new Blob([new Uint8Array(decode(cameraPhoto64.base64String!))], {
      type: `image/${cameraPhoto64.format}`,
    });

    const file = new File([blob], "Name", {
      lastModified:  Date.now(),
      type: blob.type,
    });

    console.log('file', file)
    return file
  }


  async takePhoto2() {
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
  };

  async savePicture(photo: Photo, fileName: string): Promise<UserPhoto> {
    // Fetch the photo, read as a blob, then convert to base64 format
    // await CapacitorHttp.get({
    //  url : photo.webPath!,
    //  responseType : "blob"
    // })
    const response = await fetch(photo.webPath!);
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
