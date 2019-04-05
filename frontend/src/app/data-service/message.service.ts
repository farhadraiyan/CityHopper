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
    
    header.append('Content-Type','application/json');
    return this.http.get(`http://localhost:3000/find`).pipe(map(get =>{
       get => get.json();
       return get;
    }));

  }

  getAllMessages(){
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.get<Message[]>('http://localhost:3000/message/find/All').pipe(map(res=>{
      res => res.json();
      return res;
    }))
  }


  sendMessage(msgData){
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/message/send', msgData).pipe(
      map(res => {
        res => res.json();
        return res;
      })
    )
  }
  

}
