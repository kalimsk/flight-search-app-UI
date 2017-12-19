import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {FlightSearch} from '../models/flightsearch';

@Injectable()
export class FlightSearchService {
 private url = 'http://default-Environment.ywfuhvwt6s.ap-south-1.elasticbeanstalk.com/flightSearch';
 private headers = new Headers();
 
  constructor(private http: Http) { }

   search(flightSearch:FlightSearch) {
        this.headers.append("Authorization", "bearer " + this.getToken()); 
        return this.http.post(this.url,flightSearch,{ headers:this.headers}).map((response: Response) => response.json());
    }

    getToken(): String {
      var currentUser = JSON.parse(localStorage.getItem('currentUser'));
      var token = currentUser && currentUser.token;
      console.log("token:"+token);
      return token ? token : "";
    }

}
