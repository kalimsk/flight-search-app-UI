import { Component, OnInit } from '@angular/core';
import {FlightSearchService} from '../../services/flight-search.service';
import {FeatureService} from '../../services/feature.service'
import {FlightSearch} from '../../models/flightsearch';
import {Events} from '../../models/event';
import {PopularDestination} from '../../models/populardestination';
import {Airports} from '../../models/airports';
import {DestinationRequest} from '../../models/destinationrequest';
import {EventRequest} from '../../models/eventrequest';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import {DatePipe} from "@angular/common";
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-flightsearch',
  templateUrl: './flightsearch.component.html',
  styleUrls: ['./flightsearch.component.css'],
  providers: [DatePipe]
})
export class FlightsearchComponent implements OnInit {
  isReturn:boolean=true;
  username:string = "Kalim";
  showTraffic:boolean=false;
  selectedKeyword:string='';
  eventsPlace:string='Atlanta';
  selectedDestination:string='';
  model: any = {};
  flights:FlightDetail[] = [];
  events:Events[] = [];
  destinations:PopularDestination[] = [];
  showEvents:boolean = false;
  showDestinations:boolean = true;
  minDate = new Date();
  bsConfig = Object.assign({}, { containerClass: "theme-dark-blue" });
  airports:Airports[] = [];
  showFlyFromDropdown:boolean = false;
  constructor(private flightSearchService:FlightSearchService,
              private _sanitizer: DomSanitizer,
              private featureService:FeatureService,
              private authenticationService: AuthenticationService,
              public datepipe: DatePipe) {
   
   }

  ngOnInit() {
    //  this.destinations.push({
    //   destinationHead:"Nepal Tours",
    //   destinationDetail:"India tours online offers Nepal tours, to suit every timeframe, budget and interest..",
    //   show:false
    // });
    //  this.destinations.push({
    //   destinationHead:"Kerala Tours",
    //   destinationDetail:"We offer a large variety of Kerala tour packages...",
    //   show:false
    // });
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser && currentUser.username;
    this.populatePopularDestination();

    this.populateAirports();
  }
  onNavigate(){
        //this.router.navigateByUrl("https://www.google.com");
        //window.location.href="/assets/Radar.html";
        window.open("/assets/Radar.html?origin="+this.model.flyingto.city, "_blank");
    }
logout(){
  this.authenticationService.logout();
  window.location.reload();
}
toggleFlyFromDropdown(){
  this.showFlyFromDropdown = !this.showFlyFromDropdown;
}
hideAndShow(event:Events){
  console.log(event.eventHead);
  event.show=!event.show;
}
hideAndShowDest(dest:PopularDestination){
  dest.show=!dest.show;
}

 myListFormatter(data: any): string {
      return `${data.code},${data.city},${data.country}`;
    }
 autocompleListFormatter = (data: any) : SafeHtml => {
    let html = `<div >${data.code},${data.city},${data.country}</div>`;
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }
  search(){
    console.log(this.model.flyingfrom +" "+this.model.flyingto+" "+this.model.departuredate.toLocaleString()+" "+this.model.returndate);
    console.log(this.datepipe.transform(this.model.departuredate, 'yyyy-MM-dd'));
    var dep:Date = this.model.departuredate;
    var ret:Date = this.model.returndate;
    var timeDiff = Math.abs(ret.getTime()-dep.getTime());
    var diffDays:number= Math.ceil(timeDiff / (1000 * 3600 * 24));
    console.log("days: "+diffDays); 
    var flightSearchModel:FlightSearch = new FlightSearch();
    flightSearchModel.origin=this.model.flyingfrom.code;
    flightSearchModel.destination=this.model.flyingto.code;
    flightSearchModel.lengthofstay=diffDays+"";
    flightSearchModel.departuredate=this.datepipe.transform(this.model.departuredate, 'yyyy-MM-dd');
    flightSearchModel.pointofsalecountry="US";
    this.flights = [];
    this.flightSearchService.search(flightSearchModel)
          .subscribe(
              data => {
                  
                  this.flights.push({
                    brand:"Jet Airways",
                    departTime:"7:00",
                    arrivalTime:"8:45",
                    duration:"1h 45m",
                    type:"Outbound",
                    price:data.FareInfo[0].LowestFare.Fare,
                    departAirportCD:this.model.flyingfrom.code,
                    destAirportCD:this.model.flyingto.code
                  });

                  this.flights.push({
                    brand:"Jet Airways",
                    departTime:"8:00",
                    arrivalTime:"9:45",
                    duration:"1h 45m",
                    type:"Return",
                    price:data.FareInfo[0].LowestFare.Fare,
                    departAirportCD:this.model.flyingto.code,
                    destAirportCD:this.model.flyingfrom.code
                  });

                  this.showTraffic=true;
              },
              error => {
                  console.log(error);
              });
    
    // this.events.push({
    //   eventHead:"Enrique Concert",
    //   eventDetail:"Enrique concert starts 6:30 pm in MSP on 25-Dec-2017.",
    //   show:false
    // });
    //  this.events.push({
    //   eventHead:"Dance & Drama Concert",
    //   eventDetail:"Dance & Drama Concert starts 6:30 pm in MSP on 25-Dec-2017.",
    //   show:false
    // });

    this.populateEvents(this.model.flyingto.city,this.selectedKeyword);
    
    // this.flights.push({
    //   brand:"Jet Airways",
    //   departTime:"7:30",
    //   arrivalTime:"10:45",
    //   duration:"2h 45m",
    //   type:"Direct",
    //   price:"2000",
    //   departAirportCD:"CCU",
    //   destAirportCD:"DEL"
    // });
    // this.flights.push({
    //   brand:"Air India",
    //   departTime:"7:30",
    //   arrivalTime:"10:45",
    //   duration:"2h 45m",
    //   type:"Direct",
    //   price:"5000",
    //   departAirportCD:"CCU",
    //   destAirportCD:"DEL"
    // });

    // this.flights.push({
    //   brand:"Air India",
    //   departTime:"7:30",
    //   arrivalTime:"10:45",
    //   duration:"2h 45m",
    //   type:"Direct",
    //   price:"3000",
    //   departAirportCD:"CCU",
    //   destAirportCD:"DEL"
    // });
  }

  loadDestination(event:any){
    console.log(event.target.value);
    this.selectedDestination=event.target.value;
    this.populatePopularDestination();
  }
  populatePopularDestination(){
    var destReqst:DestinationRequest = new DestinationRequest();
    destReqst.origincountry='us';
    destReqst.theme=this.selectedDestination;
    destReqst.username=this.username;
    this.destinations = [];
    
    this.featureService.getPopularDestination(destReqst)
                        .subscribe(
                                  data => {
                                    for(let loopindex=0; loopindex<data.Destinations.length; loopindex++) {
                                      console.log(data.Destinations[loopindex]);
                                        if(data.Destinations[loopindex].Destination.Type=='Airport'){
                                          console.log(data.Destinations[loopindex].Destination.CityName);
                                            this.destinations.push({
                                            destinationHead:""+data.Destinations[loopindex].Destination.CityName,
                                            destinationDetail:"Make a tour to "+data.Destinations[loopindex].Destination.AirportName,
                                            show:false
                                          });
                                          
                                        }
                                        if(this.destinations.length==5){
                                          break;
                                        }
                                      }
                                      
                                  },
                                  error => {
                                      console.log(error);
                                  });
  }

  populateEvents(location:string,keywords:string){
    var evntReqst:EventRequest = new EventRequest();
    evntReqst.location=location;
    evntReqst.keywords=keywords;
    evntReqst.username=this.username;
    this.eventsPlace = location;
    this.events = [];
     this.featureService.getEvents(evntReqst)
                        .subscribe(
                                  data => {
                                    
                                    console.log(data);
                                    this.showEvents = true;
                                      for(let loopindex=0; loopindex<data.eventsList.length; loopindex++) {
                                        
                                          this.events.push({
                                            eventHead:data.eventsList[loopindex].title,
                                            eventDetail:"Join "+data.eventsList[loopindex].venue_name+" starts at "+data.eventsList[loopindex].start_time+" at "+data.eventsList[loopindex].venue_address+","+data.eventsList[loopindex].city_name
,
                                            show:false
                                          });
                                          
                                        if(this.events.length==5){
                                          break;
                                        }
                                      }
                                  },
                                  error => {
                                      console.log(error);
                                  });
  }
  populateAirports(){
    this.airports.push({
      code:"ATL",
      city:"Atlanta",
      country:"US"
    });
    this.airports.push({
      code:"LAX",
      city:"Los Angeles",
      country:"US"
    });
    this.airports.push({
      code:"LAS",
      city:"Las Vegas",
      country:"US"
    });
    this.airports.push({
      code:"MIA",
      city:"Miami",
      country:"US"
    });

    this.airports.push({
      code:"PVG",
      city:"Shanghai",
      country:"China"
    });

    this.airports.push({
      code:"PEK",
      city:"Beijing",
      country:"China"
    });
  }

}

class FlightDetail{
  brand:String;
  departTime:String;
  arrivalTime:String;
  duration:String;
  type:String;
  price:String;
  departAirportCD:String;
  destAirportCD:String;
}
