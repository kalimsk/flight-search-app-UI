import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthenticationService {
    //private authUrl = 'http://localhost:8080/auth';
    private authUrl = 'http://loginservice-dev.ap-south-1.elasticbeanstalk.com/oauth/token';
    private headers = new Headers();

    constructor(private http: Http) {
    }

    login(username: string, password: string,facebooklogin:boolean,social_token:string): Observable<boolean> {
        var grant_type:string = "password";
        this.headers.append("Authorization", "Basic " + btoa("web_app:reader")); 
        var params = new FormData();
        //params.append('grant_type', grant_type);
        if(facebooklogin){
            params.append('grant_type', 'facebook_social');
            params.append('social_token', social_token);
        }else{
            params.append('grant_type', 'password');
            params.append('username', username);
            params.append('password', password);
        }
       
        return this.http.post(this.authUrl,params, { headers:this.headers})
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().access_token;
                if (token) {
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
                    console.log("usename:"+username);
                    console.log("token:"+token);
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    getToken(): String {
      var currentUser = JSON.parse(localStorage.getItem('currentUser'));
      var token = currentUser && currentUser.token;
      console.log("token:"+token);
      return token ? token : "";
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}