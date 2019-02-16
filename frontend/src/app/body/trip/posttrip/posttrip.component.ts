import { Component, ElementRef, NgZone, OnInit, ViewChild, DoCheck } from '@angular/core';
import { MapsAPILoader } from "@agm/core";
import { FormControl } from '@angular/forms';
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
  @ViewChild("from")
  fromSearch: ElementRef;
  @ViewChild("to")
  toSearch: ElementRef;


  constructor(private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }
  ngDoCheck() {

  }
  ngOnInit() {
    //initialize map
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();
    this.loadautocompleteFrom();
    this.loadautocompleteTo();


  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
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
            name:"toronto-to-montreal",
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
            name:"toronto-to-montreal",
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



}
