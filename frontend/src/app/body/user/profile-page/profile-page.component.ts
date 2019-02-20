import { Component, OnInit } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Headers, Http } from '@angular/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Router } from '@angular/router';
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

  headers: any;
  user: any;
  id: any;


  constructor(private userData: UserDataService, config: NgbRatingConfig, private router: Router, private _route: ActivatedRoute, private authinticateService: AuthenticationService, private http: Http) {
    // customize default values of ratings used by this component tree
    config.max = 5;
    config.readonly = true;


  }
  ngOnInit() { }
  async ngAfterContentInit() {
    this.id = this.authinticateService.getUserDetails();

    if (this.id == null) {
      alert('Please Login first!')
      this.router.navigateByUrl('/login');
    } else {
      await this.userData.getUserData(this.id['_id']).toPromise().then((res) => {
        this.user = res['user']
        console.log(this.user)

      }).catch((err) => {

      });
    }
    // this is for trips
    this._route.queryParams.subscribe(params => { this.headers = params['location']; })

  }
  async onFileChanged(event) {
    const file = event.target.files[0]
    const uploadData = new FormData();
    uploadData.append('image', file, file.name);
    uploadData.append('userId', this.user._id)
    await this.http.post('http://localhost:3000/user/upload/', uploadData).toPromise().then((res) => {
    }).catch((err) => {

    })
    await this.fetchUserDetails()
  }
  openFileUpload() {
    console.log('TEST')
    var input = document.getElementById('uploadInput')
    input.click()
  }

  async fetchUserDetails() {
    await this.userData.getUserData(this.id['_id']).toPromise().then((res) => {
      this.user = res['user']
      console.log(this.user)
    }).catch((err) => {

    });
  }
}
