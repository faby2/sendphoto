import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MyHttpServiceService } from '../service/my-http-service.service';
import { Observable, catchError } from 'rxjs';
import { AlertServiceService } from '../service/alert-service.service';
import { I_authentification } from '../interface/authentification';
import { AuthstorageService } from '../service/authstorage.service';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest  } from '@angular/common/http';
import { Http } from '@capacitor-community/http';
// import { error } from 'console';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = '';
  password: string = '';

  constructor(
    private navCtrl: NavController,
    private httpService: MyHttpServiceService,
    private alertService: AlertServiceService,
    private storageService: AuthstorageService,
    private http: HttpClient
    ) { }

  ngOnInit() {

  }

  // async makeGetRequest() {
  //   const url = 'https://www.monade-alimentaire.fr/api/connexion';
  
  //   const response = await Http.request({
  //     method: 'GET',
  //     url,
  //   });
  
  //   console.log('Réponse de la requête :', response.data);
  // }

  async onLoginFormSubmit() {
    // // Vérifier les informations de connexion ici (par exemple, avec un service d'authentification)
    // // Pour cet exemple, nous vérifions simplement que les champs sont remplis
    // if (this.password) {
    //   // Rediriger vers la page d'accueil (ou toute autre page après la connexion réussie)
    //   this.navCtrl.navigateForward(['/home']);
    // } else {
    //   // Afficher un message d'erreur si les champs ne sont pas remplis
    //   console.log('Veuillez remplir tous les champs.');
    // }
    // console.log(this.email)
    // console.log(this.password)
    // this.httpService.postData(this.email, this.password).subscribe((response)=>{
    //     console.log('bonjour',response)
    // },(error) => {
    //   console.error(error);
    // })

    // this.httpService.postData(this.email, this.password)
    // this.httpService.postData('test@test.test', 'test@test.test' )
    //   .pipe(
    //     catchError((error) => {
    //       let errorMessage = 'Erreur lors de la connexion. Veuillez réessayer.';
    //       if (error.status === 401) {
    //         errorMessage = 'Nom d\'utilisateur ou mot de passe incorrect.';
    //       }
    //       console.log('ionic_message',errorMessage)
    //       console.log('ionic_message',JSON.stringify(error))
    //       this.alertService.presentAlert(JSON.stringify(error), 'Erreur')
    //       throw error;
    //     })
    //   )
    //   .subscribe((data_user: I_authentification) => {
    //     // this.storageService.saveToken(data_user.token)
    //     console.log('ionic_message', data_user);
    //     console.log('ionic_message', JSON.stringify(data_user));
    //     // Traitez la réponse ici
    //     // this.navCtrl.navigateForward(['/home']);
    //   });

    this.httpService.postData2('test@test.test', 'test@test.test').then((value) => {
      console.log('ionic_message',JSON.stringify(value))
      const data_user : I_authentification = value.data
      this.storageService.saveToken(data_user.token)
      console.log('ionic_message', value.data)
      console.log('ionic_message','mety')
      this.navCtrl.navigateForward(['/home']);
    }).catch((error) => {
      console.log('ionic_message',JSON.stringify(error))
      console.log('ionic_message','tsy mety')
      let errorMessage = 'Erreur lors de la connexion. Veuillez réessayer.';
      if (error.status === 401) {
        errorMessage = 'Nom d\'utilisateur ou mot de passe incorrect.';
      }
      this.alertService.presentAlert(errorMessage,'ERREUR')
    })

    // var xhr = new XMLHttpRequest();
    // // xhr.withCredentials = true;

    // xhr.addEventListener("readystatechange", function() {
    //   if(this.readyState === 4) {
    //     console.log(this.responseText);
    //   }
    // });

    // xhr.open("POST", "https://www.monade-alimentaire.fr/api/connexion?email=test%40test.test&password=test%40test.test");
    // xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    // xhr.send();

    // const body = new HttpParams()
    //   .set('email', 'test@test.test')
    //   .set('password', 'test@test.test');
    // // this.http.request()
    // this.http.post('https://www.monade-alimentaire.fr/api/connexion',
    //   body.toString(),
    //   {
    //     headers: new HttpHeaders()
    //       .set('Content-Type', 'application/x-www-form-urlencoded')
    //   }).subscribe({
    //     next:(v) => {
    //       console.log('ionic_message',JSON.stringify(v))
    //       console.log('ionic_message','mety')
    //     },
    //     error : (error) => {
    //       console.log('ionic_message',JSON.stringify(error))
    //       console.log('ionic_message',' tsy mety')
    //     },
    //     complete : () => {
    //       console.log('ionic_message','complete')
    //     }
    //   })
  // this.sendCustomRequest() 
  // this.makePostRequest()
  // await this.sendCustomRequest2()
  // this.makeGetRequest()
    // this.httpService.postData2(email: string, password: string)

  }

  // protected request(url: string, body: any = null, method: string = 'GET') : Observable<any>{
    
  //   // return this.http
  //   // .request(new HttpRequest())
  //   /*.map((response) => { response = response.json() }, (error) => {
  //     this.alertCtrl.create({
  //       title: 'Erreur',
  //       message: 'Erreur liée probablement au serveur. \n ' + 
  //       'Veuillez réessayer ultérieurement',
  //       buttons: [{
  //         text: 'OK'
  //       }]
  //     }).present();
  //   })*/

  // }

  async sendCustomRequest2(){

    const url = 'https://reqbin.com/echo/post/json';

    const data = `{
      "Id": 12345,
      "Customer": "John Smith",
      "Quantity": 1,
      "Price": 10.00
    }`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: data,
    });
  
    const text = response.json().then((value)=>{
      console.log('ionic_message',JSON.stringify(value))
      console.log('ionic_message',value)
    }).catch((error)=>{
      console.log('ionic_message', JSON.stringify(error))
      console.log('ionic_message',error)
    })
  
  }

  sendCustomRequest() {
    const url : string = "https://www.monade-alimentaire.fr/api/connexion";
    const headers = new HttpHeaders({
      // 'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
      // 'Custom-Header': 'Custom-Value',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json",
        
    });

    const params = new HttpParams()
    .set('email', 'test@test.test')
    .set('password', 'test@test.test');

    // const body = { key: 'value' };

    const request = new HttpRequest('POST', url, '', {
      headers,
      params,
      reportProgress: true, // Si vous avez besoin de la progression de téléchargement
    });

    this.http.request(request).subscribe({
      next:(v) => {
        // console.log('ok',v)
        console.log('ionic_message',JSON.stringify(v))
        console.log('ionic_message','ok')
      },
      error : (error) => {
        console.log('ionic_message',JSON.stringify(error))
        // console.log('erreur',error)
        console.log('ionic_message','erreur')

      },
      complete : () => {
        console.log('ionic_message','complete')
      }
    });
  }

  async makePostRequest() {
    const url = 'https://www.monade-alimentaire.fr/api/connexion';
  
    // Donner un délai de connexion de 10 secondes (10 000 millisecondes)
    const connectTimeout = 10000; // 10 secondes en millisecondes
  
    const data = { 
      email: 'test@test.tset', 
      password: 'test@test.tset' 
    };
    
    try {
      const response = await Http.request({
        method: 'POST',
        url,
        data// Utilisation de l'option timeout pour le délai de connexion
      });
  
      console.log('Réponse de la requête :', response);
      // console.log('Réponse de la requête :', JSON.stringify(response.data));
      // console.log('Réponse de la requête :', JSON.stringify(response.data));
      // console.log('Réponse de la requête :', response.data);
    } catch (error) {
      console.error('Erreur de la requête :', error);
    }
  }
  
  
  
  
  

  // login() {}

}
