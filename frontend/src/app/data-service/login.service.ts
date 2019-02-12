import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Headers, Http} from '@angular/http';
import {throwError as observableThrowError, Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import {User} from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:Http) { }

  login(email:string, password:string){
    var body = {
      email: email,
      password:password
    }
    const head = new Headers();
    head.append('Content-Type' , 'application/json');
    
  }
  errorHandler(error: HttpErrorResponse){
    // return (error.message || "Server Error");
    return observableThrowError(error.message || "Server Error");
  }
}
