import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FlightsearchComponent } from './components/flightsearch/flightsearch.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AuthServiceConfig, FacebookLoginProvider } from 'angular4-social-login';
import { SocialLoginModule } from "angular4-social-login";


import {BrowserAnimationsModule} from '@angular/platform-browser/animations';




import { routing }        from './app.routing';

import { AlertComponent } from './components/alert/alert.component';
import { AuthGuard } from './guards/auth.guard';
import { AlertService} from './services/alert.service';
import { AuthenticationService } from './services/authentication.service';

import { UserService } from './services/user.service';

let config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("128500911172566")
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    FlightsearchComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    NgbModule.forRoot(),
    SocialLoginModule,
    BrowserAnimationsModule
    
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
