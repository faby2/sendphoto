import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpOptions } from '@capacitor/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadServiceService {
  url : string = 'https://www.monade-alimentaire.fr/api/photos'
  constructor(private http: HttpClient) {}

  uploadFile(file: File, token:string): Observable<any> {
    const formData = new FormData();
    formData.append('photo', file, file.name);
    formData.append('date', '15/12/2023');

    // const headers = new HttpHeaders();
    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${token}`,
    // });

    const headers = {
      Authorization: "Bearer 18|Q7m3vUMhWFmfDua6W6DhbeeBtQO2tWPD4pCD5x4H",
    };


    // headers.append('Content-Type', 'multipart/form-data'); // Ne pas définir directement "Content-Type"
    const options = {
      headers,
      processData: false,
      // mimeType: "multipart/form-data",
      contentType: false,
    };
    return this.http.post(this.url, formData, options);
  }

  sendPhotoDouble(file: any,file2 : File, token : string) {
    const formData = new FormData();
    formData.append('photo', file);
    formData.append('date', '15/12/2023');
    const headers = {
      // "Authorization": "Bearer 58|X3NhMrBqDweOlcVuqhEqU9MMVCiErNbeg5acKS1V",
      "Authorization": "Bearer " + token,
      'Content-Type': 'multipart/form-data'
    };
    const options: HttpOptions = {
      url: "" + this.url + "" /*+"?email="+email+"&password="+password*/,
      // headers: { 'X-Fake-Header': 'Fake-Value' },
      params: { 'date': '1/12/2023'  },
      // responseType:'json'  ,
      dataType : 'file',
      data : {
        photo : file
      },
      headers : headers
      // headers: {
      //   'Authorization': "Bearer " +  token  ,
      //   // 'Content-Type': 'application/json',
      //   'Access-Control-Allow-Origin': '*',
      //   // 'Cache-Control': 'no-cache',
      //   // 'Pragma': 'no-cache',
      //   // // "Content-Type": "application/x-www-form-urlencoded",
      //   // "Accept": "application/json",
      // },

    };

   return  CapacitorHttp.post(options );
  }


}
