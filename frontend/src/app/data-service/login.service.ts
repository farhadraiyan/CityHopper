import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Headers, Http} from '@angular/http';
import {throwError as observableThrowError, Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import {User} from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  login(email:String, password:String){
    var body = {
      email: email,
      password:password
    }
    // const head = new Headers();
    // head.append('Content-Type' , 'application/json');
    
    // return this.http.post('http://localhost:3000/user/login/', body,{headers:head})
    // .map(res=>console.log(res))
    var options = {
      headers : new HttpHeaders({'Content-Type' : 'application/json'})
    }

    return this.http.post<any>(`http://localhost:3000/user/login`, body, options);
  }
  errorHandler(error: HttpErrorResponse){
    // return (error.message || "Server Error");
    return observableThrowError(error.message || "Server Error");
  }
}
