import { Component, OnInit } from '@angular/core';
import { AlertService} from '../../services/alert.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FacebookService, InitParams, LoginResponse} from 'ngx-facebook';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  loading = false;
  returnUrl: string;
  authRes:AuthResponse;
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
    
       this.fb.login()
         .then((response: LoginResponse) => this.response=response)
         .catch((error: any) => this.alertService.error(error));

      console.log(this.response);
    
     }

  
  login() {
      this.loading = true;
      this.authenticationService.login(this.model.username, this.model.password,this.response.authResponse.accessToken)
          .subscribe(
              data => {
                  this.router.navigate([this.returnUrl]);
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
  }

}

interface AuthResponse{
    accessToken: string,
    expiresIn:string,
    signedRequest:string,
    userID:string
}
