import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../data-service/user-service.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { NgForm, NgModel } from '@angular/forms';
//import {User} from '../../../models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private errorMessage = "";
  user = new User();
  //emailPattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  //passwordPattern = "^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$";
  constructor(private addUsr: UserServiceService, private _router: Router) { }

  ngOnInit() {
    this.resetForm();
  }
  log(x){console.log(x);}
  register(){
    this.addUsr.registerUser(this.user).subscribe(
      (result) =>{
        console.log(result)
      },
      (err) =>{
        console.log(err)
      }
    )
  }

  resetForm(form?:NgForm){
    if(form != null){
      form.reset(); 
    this.user.firstname = "";
    this.user.lastname = "";
    this.user.email = "";
    this.user.password = "";
    this.user.country = "";
    this.user.province = "";
    this.user.city = "";
    this.user.phone = 0;
    this.user.terms= false;
    }

  }
  // register(firstname:string, lastname:string, email:string,
  //   password:string, cpassword:string, country:string,
  //   province:string, city:string, phone:number, terms:boolean){
  //     if(password !== cpassword){
  //       this.errorMessage = "password and confirm password do not match"
  //     }else{
  //       this.errorMessage="";
  //       let user = new User();
  //       user.firstname = firstname;
  //       user.lastname = lastname;
  //       user.email = email;
  //       user.password = password;
  //       user.country = country;
  //       user.province = province;
  //       user.city = city;
  //       user.phone = phone;
  //       user.terms = terms;

  //       this.addUsr.registerUser(user).subscribe(
  //         (result) =>{
  //           console.log(result);
  //           window.alert("The User has been added");
  //           // if(result){
  //           //   this.errorMessage = JSON.parse(JSON.stringify(result)).message;
  //           // }else{
  //           //   // where user should be redirected
  //           //   this.errorMessage = "User Added"
  //           // }
  //         },
  //         err =>{
  //           console.log(err)
  //         }
  //       );
  //     }
  //   }
}
