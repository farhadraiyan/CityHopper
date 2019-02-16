import { Component, ElementRef, NgZone, OnInit, ViewChild, DoCheck} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from "@agm/core";
import {Router} from '@angular/router';
// import { } from 'googlemaps';
declare var google: any
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title: string = 'Google map';
  latitude: number;
  longitude: number;
  searchControl: FormControl;
  zoom: number;
  myplace: object;
  @ViewChild("from")
  fromSearch: ElementRef;
  @ViewChild("to")
  toSearch: ElementRef;
  mobile: Boolean;


  constructor(private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,private router:Router) {


   }

  ngOnInit() {
    if (window.screen.width < 800) {
      this.mobile = true;
    }
    else{
      this.mobile = false;
    }


    //create search FormControl
    this.searchControl = new FormControl();

    this.loadautocompleteFrom();
    this.loadautocompleteTo();

  }


  private loadautocompleteFrom() {
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.fromSearch.nativeElement, {
        types: ["address"]
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
            name:"myLocation",
            location:
            {
              street:place.address_components[0].long_name+" "+place.address_components[1].long_name,
              geoLocationFrom:
              {
                coordinates:[4,4]

              },
              city:place.address_components[2].long_name,
              state:place.address_components[5].long_name,
              country:place.address_components[7].long_name,
              postalCode:place.address_components[6].long_name,
            }
          }
          console.log(this.myplace)
          console.log(place)
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
        types: ["address"]
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
            name:"myLocation",
            location:
            {
              street:place.address_components[0].long_name+" "+place.address_components[1].long_name,
              geoLocationFrom:
              {
                coordinates:[4,4]

              },
              city:place.address_components[2].long_name,
              state:place.address_components[5].long_name,
              country:place.address_components[7].long_name,
              postalCode:place.address_components[6].long_name,
            }
          }
          console.log(this.myplace)
          console.log(place)
          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }
  onSubmit(){

    this.router.navigate(['/profilePage'],{queryParams: {'location': [this.myplace['location']['street'],this.myplace['location']['city'],this.myplace['location']['state']]}});
  }



}
