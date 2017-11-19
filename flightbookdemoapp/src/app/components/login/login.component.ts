import { Component, OnInit } from '@angular/core';
import { AlertService} from '../../services/alert.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'angular4-social-login';
import { SocialUser } from 'angular4-social-login';
import { FacebookLoginProvider } from 'angular4-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  loading = false;
  returnUrl: string;
  user: SocialUser;
  authRes:AuthResponse;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private alertService: AlertService,
      private authService: AuthService) { }

  ngOnInit() {
      // reset login status
      this.authenticationService.logout();
      this.authService.authState.subscribe((user) => {
        this.user = user;
      });  
      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    console.info(this.user.id);
    console.info(this.user.authToken['accessToken']);
    //this.authRes = this.user.authToken;
    this.login();
  }

  signOut(): void {
    this.authService.signOut();
  }
  login() {
      this.loading = true;
      this.authenticationService.login(this.model.username, this.model.password,this.user.authToken['accessToken'])
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
