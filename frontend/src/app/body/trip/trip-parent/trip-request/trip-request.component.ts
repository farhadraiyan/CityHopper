import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../../data-service/authentication.service';
import {Headers, Http } from '@angular/http';
@Component({
  selector: 'app-trip-request',
  templateUrl: './trip-request.component.html',
  styleUrls: ['./trip-request.component.css']
})
export class TripRequestComponent implements OnInit {

  constructor(private authService: AuthenticationService, private http: Http) { }
  trips: any = []
  userID =  this.authService.getUserDetails()['_id']
  ngOnInit() {
    this.getAllUpcomingTripRequests()
  }
  getAllUpcomingTripRequests () {
    this.http.get(`http://localhost:3000/trip/find/tripRequest/${this.userID}`).toPromise().then((res) => {
      this.trips = res['data']
      console.log(JSON.parse(res['_body'])['data'])
      this.trips = JSON.parse(res['_body'])['data']
    }).catch((err) => {
      console.log(err)
    })
  }
}
