import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyHttpServiceService {

  url : string = 'https://www.monade-alimentaire.fr/api/connexion'

  constructor(private http: HttpClient) { }

  postData(email: string, password: string): Observable<any> {
    // return this.http.post(this.url +"?email=test@test.test&password=test@test.tests", '');
    return this.http.post(this.url +"?email="+email+"&password="+password, '');
  }
}
