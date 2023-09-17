import { HttpClient, HttpHeaders, HttpParams   } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { CapacitorHttp, HttpResponse , HttpOptions } from '@capacitor/core';
// import { HttpOptions } from '@capacitor-community/http';

const doPost = async () => {
  const options = {
    url: 'https://www.monade-alimentaire.fr/api/connexion',
    headers: { 'X-Fake-Header': 'Fake-Value' },
    data: { foo: 'bar' },
  };

  const response: HttpResponse = await CapacitorHttp.post(options);

  // or...
  // const response = await CapacitorHttp.request({ ...options, method: 'POST' })
};

@Injectable({
  providedIn: 'root'
})
export class MyHttpServiceService {

  url : string = "https://www.monade-alimentaire.fr/api/connexion"
  // headers = { 
  //   headers : new HttpHeaders({
  //   // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
  //   // 'Custom-Header': 'Custom-Value',
  //     'Access-Control-Allow-Origin': '*',
  //     'Cache-Control': 'no-cache',
  //     'Pragma': 'no-cache',
  //     "Content-Type": "application/x-www-form-urlencoded",
  //     "Accept": "application/json",
      
  // }) };

  httpHeader = {
    headers: new HttpHeaders(
      { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
       'Cache-Control': 'no-cache',
       'Pragma': 'no-cache',
    }),
  };
  

  constructor(private http: HttpClient  ) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  

  // postData(email: string, password: string): any{
  //   return this.http.post(this.url +"?email=test@test.test&password=test@test.tests", '');
  //   const headers = { 
  //     headers : new HttpHeaders({
  //     // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
  //     // 'Custom-Header': 'Custom-Value',
  //       'Access-Control-Allow-Origin': '*',
  //       'Cache-Control': 'no-cache',
  //       'Pragma': 'no-cache',
  //       "Content-Type": "application/x-www-form-urlencoded",
  //       "Accept": "application/json",
        
  //   }) };
  //   return this.http.post(this.url, '',{
  //     params:{
  //     email : email ,
  //     password: password
  //     },headers : headers
  //   });

  //   // return this.http.post<any>(this.url, { email: email , password : password } , this.httpHeader)
  //   // .pipe(
  //   //   catchError(this.handleError<any>('Add Student'))
  //   // );
  // }

  async postData2(email: string, password: string) {
    const options: HttpOptions = {
      url: "" + this.url + "" /*+"?email="+email+"&password="+password*/,
      // headers: { 'X-Fake-Header': 'Fake-Value' },
      params: { email: email , password : password },
      // responseType:'json'  ,
      // headers: {
      //   // 'Authorization': 'Bearer Votre-Token',
      //   'Content-Type': 'application/json',
      //   'Access-Control-Allow-Origin': '*',
      //   'Cache-Control': 'no-cache',
      //   'Pragma': 'no-cache',
      //   // "Content-Type": "application/x-www-form-urlencoded",
      //   "Accept": "application/json",
      // },
      
    };
  
   return  CapacitorHttp.post(options);
    // return response;
  }

  // async postData2(email: string, password: string) {
  //  return doPost()
  // }
}
