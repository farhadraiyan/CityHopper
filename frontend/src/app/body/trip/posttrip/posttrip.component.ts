import { Component, ElementRef, NgZone, OnInit, ViewChild, DoCheck } from '@angular/core';
import { MapsAPILoader } from "@agm/core";
import { FormControl } from '@angular/forms';
import { AuthenticationService } from 'src/app/data-service/authentication.service';
import { Router } from '@angular/router';
import { UserDataService } from '../../../data-service/user-data.service';
import { TripService } from '../../../data-service/trip.service';
import { CarService } from '../../../data-service/car.service';
import { NgForm, NgModel} from '@angular/forms';

// import { } from 'googlemaps';
declare var google: any
@Component({
  selector: 'app-posttrip',
  templateUrl: './posttrip.component.html',
  styleUrls: ['./posttrip.component.css']
})
export class PosttripComponent implements OnInit, DoCheck {
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
  trip = {}
  user:any
  tripName:any
  car:any
  message:any

  //date and time picker
  time = {hour: 13, minute: 30};
  meridian = true;
  toggleMeridian() {
    this.meridian = !this.meridian;
}


  constructor(private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private authinticateService: AuthenticationService,
    private router: Router,
    private userData: UserDataService,
    private addTripService: TripService,
    private carService: CarService

  ) { }
  ngDoCheck() {

  }


  async ngAfterContentInit() {

    this.user = this.authinticateService.getUserDetails();
    if (this.user == null) {
      alert('Please Login first!')
      this.router.navigateByUrl('/login');
    } else {
      await this.userData.getUserData(this.user['_id']).toPromise().then((res) => {
        this.user = res['user']
        if(this.user.cars){
        this.carService.getCarByUserId(this.user['_id']).toPromise().then((res) => {
            this.car = res['vehicle']
          }).catch((err) => {
          });
        }
      }).catch((err) => {
      });
  }
}


  ngOnInit() {

    //initialize map
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.addTripService.setCurrentPosition(this.latitude,this.longitude,this.zoom);
    this.loadautocompleteFrom();
    this.loadautocompleteTo();


  }

  onSubmit(date,seats,luggage,price,vehicle){
    var newDate = date.value +" "+ this.time['hour']+ ":" + this.time['minute'] +":00";
    var cost = +price.value
    var userCar = {}
    for (let value of this.car) {
      var car = value.make +" "+ value.model
      if(vehicle.value == car)
      {
        userCar = value;
      }
    }
    console.log(userCar['_id'])
    this.trip = {from:this.myplace, to:this.myDestination, cost:cost, departureTime:newDate,
       seatsAvailable:seats.value, luggage:luggage.value, driver: this.user._id, car:userCar['_id'], active: true }
       console.log(this.trip)
      this.addTripService.addTrip(this.trip).subscribe(data=>{
        console.log(data)
        this.router.navigate(['/profilePage'])
      })


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
          this.myplace={
            name:place.address_components[0].long_name,
            location:
            {
              geoLocationFrom:
              {
                coordinates:[place.geometry.location.lat(),place.geometry.location.lng()]

              },
              street:place.address_components[0].long_name+" "+place.address_components[1].long_name,
              city:place.address_components[0].long_name,
              state:place.address_components[2].long_name,
              country:place.address_components[3].long_name,

            }
          }


          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;

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
          this.myDestination={
            name:place.address_components[0].long_name,
            location:
            {
              geoLocationFrom:
              {
                coordinates:[place.geometry.location.lat(),place.geometry.location.lng()]

              },
              street:place.address_components[0].long_name+" "+place.address_components[1].long_name,
              city:place.address_components[0].long_name,
              state:place.address_components[2].long_name,
              country:place.address_components[3].long_name,
            }
          }
          this.tripName = this.myplace['name'] +" "+this.myDestination['name']
          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }



}
