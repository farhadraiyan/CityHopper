import { Component, ElementRef, NgZone, OnInit, ViewChild, DoCheck, ɵbypassSanitizationTrustStyle} from '@angular/core';
import { TripService } from '../../../data-service/trip.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from "@agm/core";
import {Router} from '@angular/router';
import { config } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-view-specific-trip',
  templateUrl: './view-specific-trip.component.html',
  styleUrls: ['./view-specific-trip.component.css'],
  providers: [NgbRatingConfig] // add NgbRatingConfig to the component providers
})
export class ViewSpecificTripComponent implements OnInit {

  constructor(private tripService: TripService,private mapsAPILoader: MapsAPILoader,private ngZone: NgZone,private router:Router,config: NgbRatingConfig,private _route: ActivatedRoute) {
    config.max = 5
    config.readonly = true;
    }
    rating:any
    id:any;
    tripData:any

  ngOnInit() {
    this.rating= 3
    //get the id comming from view Trips
    this._route.queryParams.subscribe(params => {this.id =params.id;});

    // get trips on db by id
      this.tripService.getOneTrip(this.id).subscribe(video => {
        this.tripData = video;
        console.log(this.tripData)
      });
  }

}
