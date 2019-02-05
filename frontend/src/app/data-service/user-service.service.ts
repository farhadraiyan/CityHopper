import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {throwError as observableThrowError, Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {User} from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http: HttpClient) { }

  registerUser(newUser: User){
    let options = {
      headers : new HttpHeaders({'Content-Type' : 'application/json'})
    }
    return this.http.post('http://localhost:3000/user/register', JSON.parse(JSON.stringify(newUser)), options)
    .pipe(
      catchError(this.errorHandler)
    )
  }


  errorHandler(error: HttpErrorResponse){
    // return (error.message || "Server Error");
    return observableThrowError(error.message || "Server Error");
  }
}
