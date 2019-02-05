import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../data-service/user-service.service';
import { Router } from '@angular/router';
import {User} from '../../../models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private errorMessage = "";
  constructor(private addUsr: UserServiceService, private _router: Router) { }

  ngOnInit() {
  }

  register(firstname:string, lastname:string, email:string,
    password:string, cpassword:string, country:string,
    province:string, city:string){
      if(password !== cpassword){
        this.errorMessage = "password and confirm password do not match"
      }else{
        this.errorMessage="";
        let user = new User();
        user.firstname = firstname;
        user.lastname = lastname;
        user.email = email;
        user.password = password;
        user.country = country;
        user.province = province;
        user.city = city;
    
        this.addUsr.registerUser(user).subscribe(
          result =>{
            console.log({result})
            console.log(user);
            // if(result){
            //   this.errorMessage = JSON.parse(JSON.stringify(result)).message;
            // }else{
            //   // where user should be redirected
            //   this.errorMessage = "User Added"
            // }
          },
          err =>{
            console.log(err)
          }
        );
      }
    }
}
