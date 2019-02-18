import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { Router } from '@angular/router';




// export interface UserDetails {
//   _id: string;
//   email: string;
//   name: string;
//   exp: number;
//   iat: number;
// }

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  email: string;
  password: string;
  name?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private token: String;
  constructor(private http: HttpClient, private router: Router) { }

  public saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token.toString();
  }

  private getToken(): String {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  public logout(): void {
    this.token = '';
    localStorage.removeItem('mean-token');
    this.getHeader(false);
    this.router.navigateByUrl('/');
  }

  public getUserDetails(): any {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean{
    const user =  this.getUserDetails();
    if(user){
      console.log(Date.now()/ 1000)
      return user.exp > Date.now() / 1000;
    }else{
      return false;
    }
  }



  // private request(method: 'post'|'get', type: 'login'|'register', user?: TokenPayload): Observable<any> {
  //   let base;

  //   if (method === 'post') {
  //     base = this.http.post(`/api/${type}`, user);
  //   } else {
  //     base = this.http.get(`/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
  //   }

  //   const request = base.pipe(
  //     map((data: TokenResponse) => {
  //       if (data.token) {
  //         this.saveToken(data.token);
  //       }
  //       return data;
  //     })
  //   );

  //   return request;
  // }

  // public register(user: TokenPayload): Observable<any> {
  //   return this.request('post', 'register', user);
  // }

  // public login(user: TokenPayload): Observable<any> {
  //   return this.request('post', 'login', user);
  // }


  getHeader(login){
    return login
}


}
