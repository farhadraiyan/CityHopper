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
  searchControl: FormControl;
  myplace: object;
  myDestination:object;
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
        });
      });
    });
  }


  onSubmit(){

    this.router.navigate(['/viewTrips'],{queryParams: {'myPlace': this.myplace['name'],"myDestination":this.myDestination['name']}});
  }



}
