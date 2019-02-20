import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Headers, Http} from '@angular/http';
import {throwError as observableThrowError, Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import {User} from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: Http) { }

  registerUser(newUser: User){
    const head=new Headers();
    head.append('Content-Type' , 'application/json')
      // headers : new HttpHeaders({'Content-Type' : 'application/json'})
    return this.http.post('http://localhost:3000/user/register/', newUser,{headers:head})
    .map(res=>console.log(res))
  

  }

  activateAccount(token:String){
    const head=new Headers();
    head.append('Content-Type' , 'application/json')
    return this.http.put('http://localhost:3000/user/confirmation/' + token, head).map(res=>{console.log(res)})
  }

  errorHandler(error: HttpErrorResponse){
    // return (error.message || "Server Error");
    return observableThrowError(error.message || "Server Error");
  }
}
