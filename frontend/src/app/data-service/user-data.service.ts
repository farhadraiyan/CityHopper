import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Headers, Http} from '@angular/http';
import {throwError as observableThrowError, Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import {User} from '../models/User';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http:HttpClient) { }

  getUserData(userId): Observable<any> {
    let header = new HttpHeaders();
    header.append('Content-Type','application/json');
    return this.http.get(`http://localhost:3000/user/find/${userId}`).pipe(map(get =>{
       get => get.json();
       return get;
    }));

  }

  editUser(newData,userId):Observable<any>{
    return this.http.put(`http://localhost:3000/user/edit/${userId}`,newData);
  }

}
