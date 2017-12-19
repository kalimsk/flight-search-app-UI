import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {DestinationRequest} from '../models/destinationrequest';
import {EventRequest} from '../models/eventrequest';

@Injectable()
export class FeatureService {

  constructor(private http: Http) { }

  getPopularDestination(destReqst: DestinationRequest) {
        return this.http.post('http://featureservice.ap-south-1.elasticbeanstalk.com/featureSearch', destReqst).map((response: Response) => response.json());
    }

   getEvents(eventReqst: EventRequest) {
        return this.http.post('http://featureservice.ap-south-1.elasticbeanstalk.com/getEvents', eventReqst).map((response: Response) => response.json());
    }

}
