import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { UserDataService } from 'src/app/data-service/user-data.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthenticationService } from 'src/app/data-service/authentication.service';

@Component({
  selector: 'app-settings-change-password',
  templateUrl: './settings-change-password.component.html',
  styleUrls: ['./settings-change-password.component.css']
})
export class SettingsChangePasswordComponent implements OnInit {

  constructor(private userService: UserDataService, private _router: Router
    , private authService: AuthenticationService) { }
  
  user = new User();

  ngOnInit() {
  }

  newPassword = "";
  rePassword = "";
  errorMessage = "";
  errorMessage2 = "";
  updatePass(password, newPassword, rePassword){
    // let data = this.user;
    // data.userId = this.authService.getUserDetails()['_id'];
    // this.userService.updatePassword(this.user.password).subscribe(
    //   res => {
    //     console.log(res)
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // )
    console.log(newPassword, rePassword, password)
    if (newPassword.value !== rePassword.value) {
      return this.errorMessage = "Password does not match"
    }else if(newPassword.value == "" || rePassword.value =="" || password.value ==""){
      this.errorMessage = "Fields cannot be empty"
      this.errorMessage2 ="Field Cannot be empty"

    }
    let data = {
      userId: this.authService.getUserDetails()['_id'],
      password: password.value,
      newPassword: newPassword.value
    }
    this.userService.updatePassword(data).subscribe(
        res => {
          console.log(res)
        },
        err => {
          this.errorMessage2 = "Invalid Password";
        }
      )
  }


}
