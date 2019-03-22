import { Component, OnInit } from '@angular/core';
import { TripService } from '../../../data-service/trip.service';


@Component({
  selector: 'app-view-trips',
  templateUrl: './view-trips.component.html',
  styleUrls: ['./view-trips.component.css']
})
export class ViewTripsComponent implements OnInit {

  constructor(private addTripService: TripService) { }
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
