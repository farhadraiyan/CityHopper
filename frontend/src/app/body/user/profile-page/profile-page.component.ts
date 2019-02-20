import { Component, OnInit } from '@angular/core';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import {Headers, Http} from '@angular/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/data-service/authentication.service';
import { UserDataService } from '../../../data-service/user-data.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
  providers: [NgbRatingConfig] // add NgbRatingConfig to the component providers


})
export class ProfilePageComponent implements OnInit {

  headers:any;
  user:any;
  id:any;

  constructor(private userData:UserDataService,config: NgbRatingConfig,private router:Router,private _route: ActivatedRoute,private authinticateService:AuthenticationService) {
    // customize default values of ratings used by this component tree
    config.max = 5;
    config.readonly = true;


  }

  async ngOnInit() {

    this.id = this.authinticateService.getUserDetails();

    console.log(this.user);
    if(this.id == null){
      alert('Please Login first!')
      this.router.navigateByUrl('/login');
    }else{
      await this.userData.getUserData(this.id['_id']).toPromise().then((res) => {
        this.user = res['user']
        console.log(this.user)
      }).catch((err) => {

      });
    }

    // this is for trips
    this._route.queryParams.subscribe(params => {this.headers = params['location'];})

  }



}
