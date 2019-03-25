import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private http: HttpClient) {}


  addTrip(trip): Observable<any> {
    return this.http.post('http://localhost:3000/trip/create',trip);
  }

  getAllTrips(): Observable<any> {
    return this.http.get('http://localhost:3000/trip/getAll').pipe(map((data) => {
      return data;
    }));
  }


  public setCurrentPosition(latitude,longitude,zoom) {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        zoom = 12;
      });
    }
  }

public loadautocompleteFrom(mapsAPILoader,fromSearch,ngZone,myplace,latitude,longitude,zoom) {
    //load Places Autocomplete
    mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(fromSearch.nativeElement, {
        types:  ['(cities)']
      });
      autocomplete.addListener("place_changed", () => {
        ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          myplace={
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
          latitude = place.geometry.location.lat();
          longitude = place.geometry.location.lng();
          zoom = 12;
          this.setCurrentPosition(latitude,longitude,zoom)
        });
      });
    });
  }



}
