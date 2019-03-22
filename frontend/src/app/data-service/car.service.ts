import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Headers, Http} from '@angular/http';
import {throwError as observableThrowError, Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import {Car} from '../models/Car';


@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http:HttpClient) { }

  addCar(newCar:Car){
    const head=new HttpHeaders();
    head.append('Content-type', 'application/json');
    return this.http.post(`http://localhost:3000/car/register`, newCar)
    .pipe(map(res => {
      console.log(res)
    }))
    
  }

  editCar(newData:Car, userId){
    return this.http.put(`http://localhost:3000/car/update/${userId}`, newData)
    .map(res =>{
      console.log(res)
    })

  }

  deleteCar(userId){
    return this.http.delete(`http://localhost:3000/car/delete/${userId}`)
    .map(
      res=>{
        console.log(res)
      }
    )
  }

  getAllUser(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get(`http://localhost:3000/car/find`)
    .map(res => {
      console.log(res)
    })
  }

  getCarByUserId(userId):Observable<any>{
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(`http://localhost:3000/car/find/user/${userId}`)
    .pipe(map(res => {
      res => res.json();
      return res;
    }))
  }

  getCarById(carId):Observable<any>{
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(`http://localhost:3000/car/find/${carId}`)
    .pipe(map(res => {
      res => res.json()
      return res;
    }))
  }



  errorHandler(error: HttpErrorResponse){
    return observableThrowError(error.message || "server error");
  }


}
