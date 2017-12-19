import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService } from '../../services/alert.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

 destinations:any[]=[{name:'beach', value:'beach', checked:false},
                    {name:'mountains', value:'mountains', checked:false},
                    {name:'romantic', value:'romantic', checked:false}];
 events:any[]=[{name:'Books', value:'Books', checked:false},
                    {name:'Food', value:'Food', checked:false},
                    {name:'Music', value:'Music', checked:false}];
  
  model: any = {};
  loading = false;

  constructor(
      private router: Router,
      private userService: UserService,
      private alertService: AlertService) { }

  ngOnInit() {
      }

  getselectedDests() { // right now: ['1','3']
    var destinatons:string = ''
    var dest:any[] = this.destinations
              .filter(opt => opt.checked)
              .map(opt => opt.value);
    if(dest.length==1){
        destinatons = destinatons.concat(dest[0]);
    }else if(dest.length==2){
        destinatons = destinatons.concat(dest[0]).concat('-').concat(dest[1]);
    }else if(dest.length==3){
        destinatons = destinatons.concat(dest[0]).concat('-').concat(dest[1]).concat('-').concat(dest[2]);
    }
    return destinatons;
  }

  getselectedEvents() { 
  var events:string='';
  var ev:any[]= this.events
              .filter(opt => opt.checked)
              .map(opt => opt.value);
    if(ev.length==1){
        events = events.concat(ev[0]);
    }else if(ev.length==2){
        events = events.concat(ev[0]).concat('-').concat(ev[1]);
    }else if(ev.length==3){
        events = events.concat(ev[0]).concat('-').concat(ev[1]).concat('-').concat(ev[2]);
    }

    return events;
  }
  register() {
      this.loading = true;
      console.log(this.getselectedDests());
      console.log(this.getselectedEvents());
      var user:User = new User();
      user.fName = this.model.firstName;
      user.lName = this.model.lastName;
      user.mName = "";
      user.emailId = this.model.email;
      user.contactNo = this.model.contactno;
      user.username = this.model.username;
      user.password = this.model.password;
      user.choice = this.getselectedDests()+"+"+this.getselectedEvents();
      this.userService.create(user)
          .subscribe(
              data => {
                  this.alertService.success('Registration successful', true);
                  this.loading = false;
                  //this.router.navigate(['/login']);
              },
              error => {
                  this.alertService.error('Registration unsuccessful');
                  this.loading = false;
              });
  }
}
