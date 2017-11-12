import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flightsearch',
  templateUrl: './flightsearch.component.html',
  styleUrls: ['./flightsearch.component.css']
})
export class FlightsearchComponent implements OnInit {
  isReturn:boolean=true;
  model: any = {};
  flights:FlightDetail[] = [];
  constructor() {
   
   }

  ngOnInit() {
  }

  search(){
    console.log(this.model.flyingfrom +" "+this.model.flyingto+" "+this.model.departuredate.toLocaleString()+" "+this.model.returndate);
    this.flights.push({
      brand:"Jet Airways",
      departTime:"7:30",
      arrivalTime:"10:45",
      duration:"2h 45m",
      type:"Direct",
      price:"2000",
      departAirportCD:"CCU",
      destAirportCD:"DEL"
    });
    this.flights.push({
      brand:"Air India",
      departTime:"7:30",
      arrivalTime:"10:45",
      duration:"2h 45m",
      type:"Direct",
      price:"5000",
      departAirportCD:"CCU",
      destAirportCD:"DEL"
    });

    this.flights.push({
      brand:"Air India",
      departTime:"7:30",
      arrivalTime:"10:45",
      duration:"2h 45m",
      type:"Direct",
      price:"3000",
      departAirportCD:"CCU",
      destAirportCD:"DEL"
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
