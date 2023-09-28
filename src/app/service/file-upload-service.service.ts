import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpOptions } from '@capacitor/core';
import { Observable } from 'rxjs';
import { ApproovHttp   } from '@awesome-cordova-plugins/approov-advanced-http/ngx';
import { Http, HttpUploadFileOptions, HttpUploadFileResult } from '@capacitor-community/http';
// import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class FileUploadServiceService {
  url : string = 'https://www.monade-alimentaire.fr/api/photos'
  http_ : ApproovHttp  = new ApproovHttp();
  // http__ : http = new Http()
  constructor( private http__: HttpClient, ) {}

  uploadFile(file: File, token?:string): Observable<any> {

    console.log('file',file)
    const formData = new FormData();
    formData.append('photo', file, file.name);
    formData.append('date', '15/12/2023');

    // const headers = new HttpHeaders();
    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${token}`,
    // });

    const headers = {
      Authorization: "Bearer 59|qCgs1JYA098GhQsSfVcXskKWo9lukqLaRAxdzxGK",
    };


    // headers.append('Content-Type', 'multipart/form-data'); // Ne pas définir directement "Content-Type"
    const options = {
      headers,
      processData: false,
      // mimeType: "multipart/form-data",
      contentType: false,
    };
    return this.http__.post(this.url, formData, options);
  }

  sendPhotoDouble(file_image: any,file2 : File, token : string) {
    console.log('file', file_image)
    // let file : any = file_image.image.dataUrl
    let file : any = file_image
    // console.log('file', this.convertFileToBase64(file))
    // debugger
    // const formData = new FormData();
    // formData.append('photo', file);
    // formData.append('date', '15/12/2023');
    const headers = {
      "Authorization": "Bearer 59|qCgs1JYA098GhQsSfVcXskKWo9lukqLaRAxdzxGK",
      'Content-Type': 'multipart/form-data',
      'Accept': 'plain/text',
    };
    const options: HttpOptions = {
      url: "" + this.url + "" /*+"?email="+email+"&password="+password*/,
      // headers: { 'X-Fake-Header': 'Fake-Value' },
      params: { 'date': '1/12/2023'  },
      // responseType:'json'  ,
      dataType : 'formData',
      method: 'POST',
      data :
      // JSON.stringify(
        {
        photo : file
      }
      // )
      ,
      headers : headers
      // headers: {
      //   'Authorization': "Bearer " +  token  ,
      //   // 'Content-Type': 'application/json',
      //   'Access-Control-Allow-Origin': '*',
      //   // 'Cache-Control': 'no-cache',
      //   // 'Pragma': 'no-cache',
        // // "Content-Type": "application/x-www-form-urlencoded",
      //   // "Accept": "application/json",
      // },

    };

    // console.log('options', options)
    // debugger
   return  CapacitorHttp.request(options);
  //  return  CapacitorHttp.post(options );
  }

  sendPhotoDouble2(file_image: any,file2 : File, token : string) {
    // console.log('file', file.image.dataUrl)
    // let file : any = file_image.image.dataUrl
    let file : any = file_image
    // console.log('file', this.convertFileToBase64(file))
    // debugger
    const formData = new FormData();
    formData.append('photo', file,'test.jpg');
    // formData.append('date', '15/12/2023');
    const headers = {
      // "Authorization": "Bearer 58|X3NhMrBqDweOlcVuqhEqU9MMVCiErNbeg5acKS1V",
      "Authorization": "Bearer " + token,
      'Content-Type': 'multipart/form-data'
      // "Authorization": "Bearer 59|qCgs1JYA098GhQsSfVcXskKWo9lukqLaRAxdzxGK",
      // 'Content-Type': 'multipart/form-data',
      // 'Accept': 'plain/text',
    };
    const options: HttpOptions = {
      url: "" + this.url + "" /*+"?email="+email+"&password="+password*/,
      // headers: { 'X-Fake-Header': 'Fake-Value' },
      params: { 'date': '1/12/2023'  },
      // responseType:'json'  ,
      dataType : 'formData',
      data : JSON.stringify(formData)
      // )
      ,
      headers : headers
      // headers: {
      //   'Authorization': "Bearer " +  token  ,
      //   // 'Content-Type': 'application/json',
      //   'Access-Control-Allow-Origin': '*',
      //   // 'Cache-Control': 'no-cache',
      //   // 'Pragma': 'no-cache',
        // // "Content-Type": "application/x-www-form-urlencoded",
      //   // "Accept": "application/json",
      // },

    };

   return  CapacitorHttp.post(options );
  }


  convertFileToBase64(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      console.log(base64String); // Affiche la représentation en base64 du fichier
      // Vous pouvez maintenant utiliser base64String comme nécessaire
    };
    reader.readAsDataURL(file);
  }

  // Supposons que vous appelez cette fonction lorsque vous avez un objet File
  handleFileInput(event: any) {
    const file = event.target.files[0];
    this.convertFileToBase64(file);
  }

  async takeExemple2(filepath:any, token : any) {

    const headers = {
      // "Authorization": "Bearer 58|X3NhMrBqDweOlcVuqhEqU9MMVCiErNbeg5acKS1V",
      "Authorization": "Bearer " + token,
      'Content-Type': 'multipart/form-data'
      // "Authorization": "Bearer 59|qCgs1JYA098GhQsSfVcXskKWo9lukqLaRAxdzxGK",
      // 'Content-Type': 'multipart/form-data',
      // 'Accept': 'plain/text',
    };
    const fileoption : HttpUploadFileOptions   = {
      url : this.url ,
      params : { date : '10/12/2023' },
      filePath : filepath,
      name : 'photo',
      headers : headers
    }

    await Http.uploadFile(fileoption).then((Response :  HttpUploadFileResult ) =>{
      console.log('ok', Response)
    } ).catch((error)=>{
      console.log('error', error)
    })

  }

  async takeExemple(path:any) {
    // this.http.get()
    const filePath:any = 'file:///somepicture.jpg';
    const name = 'picture';

    // e.g. for multiple files
    // const filePath = ['file:///somepicture.jpg', 'file:///somedocument.doc'];
    // const name = ['picture', 'document'];
    this.http_.uploadFile(
      this.url,
      {
        date: '10/12/2023'
      },
      {
        Authorization: 'OAuth2: token'
      },
      filePath, name
    ).then((response) => {
      console.log('response', response)
    }).catch((erreur)=>{
      console.log('erreur', erreur)
    })
  }




  // public uploadFile(imageURI:any) {
  //   return new Promise((resolve, rejet) =>{
  //       const fileTransfer: FileTransferObject = this.transfer.create();
  //       let options: FileUploadOptions = {
  //         fileKey: 'image',
  //         httpMethod: 'POST',
  //         chunkedMode: true,
  //         mimeType: "image/jpeg",
  //         headers: {
  //           'Accept': 'application/json'
  //         }
  //       }
  //       let resource = 'images/temp';
  //       let url = Config.endpoints.cyclos + resource;
  //       fileTransfer.upload(imageURI, encodeURI(url), options)
  //         .then((imageId) => {
  //           resolve(imageId.response);
  //       }, (error) => {
  //         rejet(error);
  //     });
  //   });
  // }



}
