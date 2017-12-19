import { Component, OnInit } from '@angular/core';
import { AlertService} from '../../services/alert.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FacebookService, InitParams, LoginResponse, LoginOptions } from 'ngx-facebook';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  loading = false;
  returnUrl: string;
  response: LoginResponse;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private alertService: AlertService,
      private fb: FacebookService
    ) {
        let initParams: InitParams = {
            appId: '128500911172566',
            xfbml: true,
            version: 'v2.11'
          };
       
          fb.init(initParams);
     }

  ngOnInit() {
      // reset login status
      this.authenticationService.logout();
      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  loginWithFacebook(): void {

const loginOptions:
    LoginOptions  = {

enable_profile_selector: 
true,

return_scopes: 
true,

scope: 'public_profile,user_friends,email,pages_show_list'

};

    
       this.fb.login(loginOptions)
         .then((response: LoginResponse) =>{
               this.model.username = response.authResponse.userID;
               this.login(true,response.authResponse.accessToken);
         } 
                 )
         .catch((error: any) => this.alertService.error(error));

      
    
     }

  loginWithUP(){
    this.login(false,"");
  }
  login(facebooklogin:boolean,social_token:string) {
      //this.loading = true;
      //localStorage.setItem('currentUser', JSON.stringify({ username: this.model.username, token: "token" }));
       //this.router.navigate([this.returnUrl]);
      this.authenticationService.login(this.model.username, this.model.password,facebooklogin,social_token)
          .subscribe(
              data => {
                  this.router.navigate([this.returnUrl]);
              },
              error => {
                  this.alertService.error("Error in login");
                  this.loading = false;
              });
  }

}
