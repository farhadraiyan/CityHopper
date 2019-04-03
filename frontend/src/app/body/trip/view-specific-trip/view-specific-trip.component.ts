import { Component, ElementRef, NgZone, OnInit, ViewChild, DoCheck, ɵbypassSanitizationTrustStyle} from '@angular/core';
import { TripService } from '../../../data-service/trip.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from "@agm/core";
import {Router} from '@angular/router';
import { config } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


// import { } from 'googlemaps';
declare var google: any
@Component({
  selector: 'app-view-specific-trip',
  templateUrl: './view-specific-trip.component.html',
  styleUrls: ['./view-specific-trip.component.css'],
  providers: [NgbRatingConfig] // add NgbRatingConfig to the component providers
})
export class ViewSpecificTripComponent implements OnInit {

  title: string = 'Google map';
  latitude: number;
  longitude: number;
  searchControl: FormControl;
  zoom: number;
  myplace: object;
  myDestination:object;
  @ViewChild("from")
  fromSearch: ElementRef;
  @ViewChild("to")
  toSearch: ElementRef;

  constructor(private tripService: TripService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router:Router,
    config: NgbRatingConfig,
    private addTripService: TripService,
    private _route: ActivatedRoute) {



    config.max = 5
    config.readonly = true;
    }
    rating:any
    id:any;
    tripData:any
    time:any

  ngOnInit() {

  //initialize map
  this.zoom = 4;
  this.latitude = 39.8282;
  this.longitude = -98.5795;
    //set current position
    this.addTripService.setCurrentPosition(this.latitude,this.longitude,this.zoom);
  //create search FormControl
  this.searchControl = new FormControl();

    this.rating= 3
    //get the id comming from view Trips
    this._route.queryParams.subscribe(params => {this.id =params.id;});

    // get trips on db by id
      this.tripService.getOneTrip(this.id).subscribe(video => {
        this.tripData = video;
        var date = this.convertTime(this.tripData['departureTime'],false)
        this.tripData['departureTime'] = date
        this.time =  date.substring(16,23);
      });

  }

  convertTime(isoTime,validation) {


    var timeStr = isoTime;
    var date = new Date(timeStr);
    var day = date.getDate();
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var pm = date.getTimezoneOffset();
    var ampm="am"
    var months = [ "January", "February", "March", "April", "May", "June",
           "July", "August", "September", "October", "November", "December" ];

    if (hours == 12) {
      ampm = 'pm';
    } else if (hours == 0) {
      hours = 12;
    } else if (hours > 12) {
      hours -= 12;
      ampm = 'pm';
    }
    if(validation ==  true){
      day =day+1
      var dateStr = months[month-1]+" "+ day +", "+ year;
    }else{
      var dateStr = months[month-1]+" "+day+", "+year+" - "+hours+":"+minutes+ ampm;
    }
    return dateStr
  }





}


