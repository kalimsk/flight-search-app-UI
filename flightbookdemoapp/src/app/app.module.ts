import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FlightsearchComponent } from './components/flightsearch/flightsearch.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FacebookModule } from 'ngx-facebook';
import {BsDatepickerModule} from 'ngx-bootstrap'; 


import {BrowserAnimationsModule} from '@angular/platform-browser/animations';




import { routing }        from './app.routing';

import { AlertComponent } from './components/alert/alert.component';
import { AuthGuard } from './guards/auth.guard';
import { AlertService} from './services/alert.service';
import { AuthenticationService } from './services/authentication.service';

import { UserService } from './services/user.service';
import {FlightSearchService} from './services/flight-search.service';
import {FeatureService} from './services/feature.service';
// noinspection TypeScriptCheckImport
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    FlightsearchComponent,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    NgbModule.forRoot(),
    BsDatepickerModule.forRoot(),
    Ng2AutoCompleteModule,
    FacebookModule.forRoot(),
    BrowserAnimationsModule
    
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    FlightSearchService,
    FeatureService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
