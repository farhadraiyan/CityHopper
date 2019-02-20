import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/data-service/login.service';
import { AuthenticationService } from 'src/app/data-service/authentication.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService:LoginService, private authinticateService:AuthenticationService, private router: Router,private _route: ActivatedRoute) { }

  public user: User;
  message:any;
  loginError:any =false;

  ngOnInit() {
    this.resetForm();
    this._route.queryParams.subscribe(params => {this.message =params['authentication'];});

  }

  logUser(email: String, password: String){
    this.loginService.login(email, password).subscribe(
      (result) => {
        if(result){
          this.authinticateService.saveToken(result.token);
          this.router.navigateByUrl('/profilePage')
        }
      },
      (err) => {
        this.loginError =true;
      }
    )


  }

  resetForm(form?:NgForm){
    if(form != null){
      form.reset()
    }
  }
}
