import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Headers, Http} from '@angular/http';
import {throwError as observableThrowError, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Message} from '../models/Message';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  makePayment(paymentData){
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/payment/create-payment', paymentData).pipe(
      map(res => {
        res => res.json();
        return res;
      })
    )
  }
}
