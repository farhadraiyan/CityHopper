import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Headers, Http} from '@angular/http';
import {throwError as observableThrowError, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Message} from '../models/Message';
@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http:HttpClient) { }

  getMessageId(msgId): Observable<any>{
    let header = new HttpHeaders();
    let messId = new Message()
    
    header.append('Content-Type','application/json');
    return this.http.get(`http://localhost:3000/find/${msgId}`).pipe(map(get =>{
       get => get.json();
       return get;
    }));

  }

  // getMessageBySendersId(sendId): Observable<any>{
  //   let header = new HttpHeaders();

  // }
  

}
