import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
      mimeType: "multipart/form-data",
      contentType: false,
    };
    return this.http.post(this.url, formData, options);
  }
}
