import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/data-service/user-data.service';
import { AuthenticationService } from 'src/app/data-service/authentication.service';
import { UserServiceService } from 'src/app/data-service/user-service.service';
import { User } from 'src/app/models/User';
import {Router} from '@angular/router';

@Component({
  selector: 'app-settings-security',
  templateUrl: './settings-security.component.html',
  styleUrls: ['./settings-security.component.css']
})
export class SettingsSecurityComponent implements OnInit {

  user = new User();
  constructor(private usrDataServ: UserDataService, private authServ: AuthenticationService, 
    private usrServ: UserServiceService, private router: Router) { }

  ngOnInit() {
    this.getUserEmail();
  }


  getUserEmail(){
    this.user = this.authServ.getUserDetails()
    console.log(this.user)
  }

  updateEmail(){
    let data = this.user;
    data.userId = this.authServ.getUserDetails()['_id']
    // console.log(data);
    this.usrDataServ.updateEmail(this.user).subscribe(
      res =>{
        this.router.navigate(['/settings'],{queryParams: {'authentication': 'Email Updated Successfully'}});
      },
      err =>{
        console.log(err)
      }
    )
  }
}
