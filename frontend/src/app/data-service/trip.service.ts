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
  getOneTrip(id): Observable<any> {
    return this.http.get(`http://localhost:3000/trip/getOne/${id}`).pipe(map((data) => {
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




}
