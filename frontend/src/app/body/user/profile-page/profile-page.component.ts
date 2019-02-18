import { Component, OnInit } from '@angular/core';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import {Headers, Http} from '@angular/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/data-service/authentication.service';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
  providers: [NgbRatingConfig] // add NgbRatingConfig to the component providers


})
export class ProfilePageComponent implements OnInit {

  headers:any;
  user:any;

  constructor(config: NgbRatingConfig,private router:Router,private _route: ActivatedRoute,private authinticateService:AuthenticationService) {
    // customize default values of ratings used by this component tree
    config.max = 5;
    config.readonly = true;


  }

  ngOnInit() {
    this.user = this.authinticateService.getUserDetails();

    // this is for trips
    this._route.queryParams.subscribe(params => {this.headers = params['location'];})

  }



}
