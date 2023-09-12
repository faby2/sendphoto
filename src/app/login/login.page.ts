import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MyHttpServiceService } from '../service/my-http-service.service';
import { catchError } from 'rxjs';
import { AlertServiceService } from '../service/alert-service.service';
import { I_authentification } from '../interface/authentification';
import { AuthstorageService } from '../service/authstorage.service';

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
    private storageService: AuthstorageService
    ) { }

  ngOnInit() {

  }

  onLoginFormSubmit() {
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

    this.httpService.postData(this.email, this.password)
      .pipe(
        catchError((error) => {
          let errorMessage = 'Erreur lors de la connexion. Veuillez réessayer.';
          if (error.status === 401) {
            errorMessage = 'Nom d\'utilisateur ou mot de passe incorrect.';
          }
          console.log(errorMessage)
          this.alertService.presentAlert(error, 'Erreur')
          throw error;
        })
      )
      .subscribe((data_user: I_authentification) => {
        this.storageService.saveToken(data_user.token)
        console.log(data_user);
        // Traitez la réponse ici
        this.navCtrl.navigateForward(['/home']);
      });
  }

  login() {}

}
