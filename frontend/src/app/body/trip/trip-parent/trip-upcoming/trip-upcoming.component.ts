import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../../data-service/authentication.service';
import {Headers, Http , HttpClient} from '@angular/http';
@Component({
  selector: 'app-trip-upcoming',
  templateUrl: './trip-upcoming.component.html',
  styleUrls: ['./trip-upcoming.component.css']
})
export class TripUpcomingComponent implements OnInit {

  constructor(private authService: AuthenticationService, private http: Http) { }
  trips: any = []
  userID =  this.authService.getUserDetails()['_id']
  ngOnInit() {
    this.getAllTripRequests()
  }
  getAllTripRequests () {
    this.http.get(`http://localhost:3000/trip/find/upcomingTrips/${this.userID}`).toPromise().then((res) => {
      this.trips = res['data']
      console.log(JSON.parse(res['_body'])['data'])
      this.trips = JSON.parse(res['_body'])['data']
    }).catch((err) => {
      console.log(err)
    })
  }

}
