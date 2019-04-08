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

  getMessageId(userid): Observable<any>{
    let header = new HttpHeaders();    
    header.append('Content-Type','application/json');
    return this.http.post(`http://localhost:3000/message/find/From`, userid).pipe(map(get =>{
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
    console.log(msgData)
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/message/send', msgData).pipe(
      map(res => {
        res => res.json();
        return res;
      })
    )
  }

  deleteMessage(msgId){
    console.log(msgId)
    return this.http.delete('http://localhost:3000/message/delete', msgId).pipe(
      map(res => {
        console.log(res)
      })
    )
  }
  

}
