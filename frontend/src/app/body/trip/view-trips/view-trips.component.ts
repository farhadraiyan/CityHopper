import { Component, ElementRef, NgZone, OnInit, ViewChild, DoCheck} from '@angular/core';
import { TripService } from '../../../data-service/trip.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from "@agm/core";
import {Router} from '@angular/router';
import { config } from 'rxjs';

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
    config: NgbRatingConfig) {
    config.max = 5
    config.readonly = true;
    }

    trips:any
    mobile: Boolean;
    rating:any;
    time:any;
    search:any = [];
    searchValidation:Boolean;



  async ngAfterContentInit() {
    await this.addTripService.getAllTrips().toPromise().then((res) =>{
      this.trips = res
      for (let i in this.trips){
        this.time = this.convertTime(this.trips[i].departureTime)
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
    this.rating= 3

  }

  viewTrip(id){
    console.log(id)
  }

  convertTime(isoTime) {

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
    var dateStr = months[month-1]+" "+day+", "+year+" - "+hours+":"+minutes+ ampm;
    return dateStr
  }

  onSubmit(from,to){

    for (let i in this.trips){
      if(this.trips[i].from.name == from.value && this.trips[i].to.name == to.value  ){
          this.search.push(this.trips[i])
          console.log(this.trips[i].from.name)
          console.log(this.search)
          this.searchValidation = true;
      }
    }
  }


}
