import { Component, ElementRef, NgZone, OnInit, ViewChild, DoCheck, ɵbypassSanitizationTrustStyle} from '@angular/core';
import { TripService } from '../../../data-service/trip.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from "@agm/core";
import {Router} from '@angular/router';
import { config } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-trips',
  templateUrl: './view-trips.component.html',
  styleUrls: ['./view-trips.component.css'],
  providers: [NgbRatingConfig] // add NgbRatingConfig to the component providers
})
export class ViewTripsComponent implements OnInit {

  constructor(private addTripService: TripService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router:Router,
    config: NgbRatingConfig,
    private _route: ActivatedRoute) {
    config.max = 5
    config.readonly = true;
    }
    title: string = 'Google map';
    searchControl: FormControl;
    myplace: String;
    myDestination:String;
    @ViewChild("from")
    fromSearch: ElementRef;
    @ViewChild("to")
    toSearch: ElementRef;

    trips:any
    mobile: Boolean;
    rating:any;
    time:any;
    search:any = [];
    searchValidation:Boolean;
    message:any;




  async ngAfterContentInit() {
    await this.addTripService.getAllTrips().toPromise().then((res) =>{
      this.trips = res

      for (let i in this.trips){
        this.time = this.convertTime(this.trips[i].departureTime,false)
        this.trips[i].departureTime =  this.time
      }
    }).catch((err) => {
     console.log(err)
   });

  }

  ngOnInit() {
    if (window.screen.width < 800) {
      this.mobile = true;
    }
    else{
      this.mobile = false;
    }
    this._route.queryParams.subscribe(params => {
      this.myplace = params['myPlace'],
      this.myDestination =  params['myDestination']
      if(this.myplace){
        this.homeSearch(this.myplace,this.myDestination)
      }
     })

    this.rating= 3
    this.loadautocompleteFrom();
    this.loadautocompleteTo();
  }

  homeSearch(from,to){
    this.homeSearch = from['name']

  }



  viewTrip(id){
    this.router.navigate(['/viewSpecificTrip'],{queryParams: {'id': id}});
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

onSubmit(from,to,date){
    var validation = false;
    var dates = this.convertTime(date.value,true)
    for (let i in this.trips){
      var newD = this.trips[i].departureTime.substring(0, 14);
      if(this.trips[i].from.name == this.myplace && this.trips[i].to.name == this.myDestination || newD == dates){
        if(!this.search.includes(this.trips[i])){
          this.search.push(this.trips[i])
          this.searchValidation = true;
          validation = true;
        };
        validation = true;
      }
    }
    if(validation == false){
      this.message =  "trip not founded!"
    }
  }



  private loadautocompleteFrom() {
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.fromSearch.nativeElement, {
        types:  ['(cities)']
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.myplace=place.address_components[0].long_name
        });
      });
    });
  }
  private loadautocompleteTo() {
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.toSearch.nativeElement, {
        types:['(cities)']
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.myDestination = place.address_components[0].long_name
        });
      });
    });
  }

}
