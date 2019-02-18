import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/data-service/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authinticateService:AuthenticationService,private router:Router) { }
  login:any;
  user:any;
  ngOnInit() {

    this.login =this.authinticateService.getUserDetails()
    console.log(this.login)
  }
  logout(){

    this.authinticateService.logout();
  }
}
