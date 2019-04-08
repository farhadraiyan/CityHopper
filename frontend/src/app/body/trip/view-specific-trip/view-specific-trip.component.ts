import { Component, ElementRef, NgZone, OnInit, ViewChild, DoCheck, ɵbypassSanitizationTrustStyle } from '@angular/core';
import { TripService } from '../../../data-service/trip.service';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from "@agm/core";
import { Router } from '@angular/router';
import { config } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CarService } from '../../../data-service/car.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'src/app/data-service/message.service';
import { AuthenticationService } from 'src/app/data-service/authentication.service';
import { Message } from 'src/app/models/Message';
import { TripRequest } from 'src/app/models/TripRequest';


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
  myDestination: object;
  @ViewChild("from")
  fromSearch: ElementRef;
  @ViewChild("to")
  toSearch: ElementRef;
  closeResult: string;

  constructor(private tripService: TripService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router: Router,
    config: NgbRatingConfig,
    private addTripService: TripService,
    private _route: ActivatedRoute,
    private carService: CarService,
    private modalService: NgbModal,
    private authService: AuthenticationService,
    private messageServie: MessageService) {
    config.max = 5
    config.readonly = true;
  }
  rating: any
  id: any;
  tripData: any
  time: any
  car: any

  origin = { lat: 0, lng: 0}
  destination = { lat: 0, lng: 0 }

  messageData = new Message();
  tripRequestData = new TripRequest();
  async ngOnInit() {

    console.log(origin)


    //set current position
    this.addTripService.setCurrentPosition(this.latitude, this.longitude, this.zoom);
    //create search FormControl
    this.searchControl = new FormControl();

    this.rating = 3
    //get the id comming from view Trips
    this._route.queryParams.subscribe(params => { this.id = params.id; });

    // get trips on db by id
    this.tripService.getOneTrip(this.id).subscribe(data => {
      this.tripData = data
      this.carService.getCarById(this.tripData.car).subscribe(data => {
        this.car = data
      })
      var date = this.convertTime(this.tripData['departureTime'], false)
      this.tripData['departureTime'] = date
      this.time = date.substring(16, 23);
      console.log(this.tripData.to.location.geoLocationFrom.coordinates[0])
      this.origin ={
        lat:this.tripData.from.location.geoLocationFrom.coordinates[0],
        lng:this.tripData.from.location.geoLocationFrom.coordinates[1]
      }
      this.destination = {
        lat:this.tripData.to.location.geoLocationFrom.coordinates[0],
        lng:this.tripData.to.location.geoLocationFrom.coordinates[1]
      }
    });

  }

  convertTime(isoTime, validation) {


    var timeStr = isoTime;
    var date = new Date(timeStr);
    var day = date.getDate();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var pm = date.getTimezoneOffset();
    var ampm = "am"
    var months = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];

    if (hours == 12) {
      ampm = 'pm';
    } else if (hours == 0) {
      hours = 12;
    } else if (hours > 12) {
      hours -= 12;
      ampm = 'pm';
    }
    if (validation == true) {
      day = day + 1
      var dateStr = months[month - 1] + " " + day + ", " + year;
    } else {
      var dateStr = months[month - 1] + " " + day + ", " + year + " - " + hours + ":" + minutes + ampm;
    }
    return dateStr
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  sendMessage() {
    this.messageData.to = this.tripData.driver._id;
    this.messageData.from = this.authService.getUserDetails()['_id']
    this.messageServie.sendMessage(this.messageData).subscribe(
      (res) => {
        console.log(res)
      },
      (err) => {
        console.log(err)
      }
    )
  }

  sendTripRequest() {
    this.tripRequestData.riderId = this.authService.getUserDetails()['_id']
    this.tripRequestData.tripId = this.tripData._id
    this.tripRequestData.Confirmed = false;
    this.tripService.sendRequest(this.tripRequestData).subscribe(
      (res) => {
        console.log(res)
      },
      (err) => {
        console.log(err)
      }
    )
  }

}
