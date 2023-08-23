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
    formData.append('file', file, file.name);

    // const headers = new HttpHeaders();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
    headers.append('Content-Type', 'multipart/form-data'); // Ne pas définir directement "Content-Type"

    return this.http.post(this.url, formData, { headers });
  }
}
