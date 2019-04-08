import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../../data-service/authentication.service';
import { Headers, Http } from '@angular/http';
@Component({
  selector: 'app-trip-upcoming',
  templateUrl: './trip-upcoming.component.html',
  styleUrls: ['./trip-upcoming.component.css']
})
export class TripUpcomingComponent implements OnInit {

  constructor(private authService: AuthenticationService, private http: Http) { }
  trips: any = []
  userID = this.authService.getUserDetails()['_id']
  async ngOnInit() {
    await this.getAllTripRequests()
    console.log(this.trips, 'huehue')
  }
  getAllTripRequests() {
    return this.http.get(`http://localhost:3000/trip/find/upcomingTrips/${this.userID}`).toPromise().then((res) => {
      this.trips = res['data']
      console.log(JSON.parse(res['_body'])['data'])
      this.trips = JSON.parse(res['_body'])['data']
    }).catch((err) => {
      console.log(err)
    })
  }

  getFormatedDate(date) {
    let D_a_t_e = date.split('T')
    return `${D_a_t_e[0]} at ${D_a_t_e[1].substr(0, 5)}`
  }

  cancelTripRequest(tripReqId) {
    return this.http.delete(`http://localhost:3000/trip/cancelRequest/${tripReqId}`).toPromise().then((res) => {
      this.getAllTripRequests()
    }).catch((err) => {
      console.log(err)
    })
  }

}
