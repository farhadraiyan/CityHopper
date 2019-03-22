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


  async ngAfterContentInit() {





    await this.addTripService.getAllTrips().toPromise().then((res) =>{
      this.trips = res
      console.log(this.trips)
    }).catch((err) => {
     console.log(err)
   });

  }
  ngOnInit() {
  }

}
