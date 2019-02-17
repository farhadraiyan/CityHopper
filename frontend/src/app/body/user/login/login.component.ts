import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/data-service/login.service';
import { AuthenticationService } from 'src/app/data-service/authentication.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService:LoginService, private authinticateService:AuthenticationService, private router: Router) { }

  public user: User;  
  ngOnInit() {
    this.resetForm();
  }

  logUser(email: String, password: String){
    this.loginService.login(email, password).subscribe(
      (result) => {
        console.log(result)
        if(result){
          this.authinticateService.saveToken(result.token);
          this.router.navigateByUrl('/profilePage')
        }
      },
      (err) => {
        console.log(err + "-> Whats the issue")
      }
    )
  }

  resetForm(form?:NgForm){
    if(form != null){
      form.reset()
    }
  }
}
