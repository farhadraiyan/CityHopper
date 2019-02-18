import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/data-service/authentication.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  login:any;
  user:any;

  constructor(private authinticateService:AuthenticationService,private router:Router) { }

  ngOnInit() {

   this.user =this.authinticateService.getUserDetails()
   this.login = this.authinticateService.getHeader(this.user);
   console.log(this.login)
  }

  logout(){

    this.authinticateService.logout();
    // this.router.navigate(['/profilePage']);
  }
}
