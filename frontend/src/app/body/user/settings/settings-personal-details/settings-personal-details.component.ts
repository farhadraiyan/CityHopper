import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../../../data-service/user-data.service';
import { AuthenticationService } from 'src/app/data-service/authentication.service';
import {Router} from '@angular/router';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-settings-personal-details',
  templateUrl: './settings-personal-details.component.html',
  styleUrls: ['./settings-personal-details.component.css']
})
export class SettingsPersonalDetailsComponent implements OnInit {

  constructor(private userData:UserDataService,private authinticateService:AuthenticationService,private router:Router) { }

  user= new User();
  id:any;
  // user:any;


  async ngOnInit() {
    this.id = this.authinticateService.getUserDetails();
    if(this.id !=null){
    await this.userData.getUserData(this.id['_id']).toPromise().then((res) => {
      this.user = res['user']

    }).catch((err) => {
      console.log(err)
    });
  }
}

  
  onSubmit(){

  //  this.user={firstName:firstName.value,lastName:lastName.value,phoneNumber:phoneNumber.value,dateOfBirth:dateOfBirth.value,description:description.value,city:city.value,province:province.value,country:country.value}
    this.userData.editUser(this.user,this.id['_id']).subscribe(
      data=>{
      console.log(data)
    },
    err =>{
      console.log(err)
    });

    this.router.navigate(['/settings'],{queryParams: {'authentication': 'User Successfully updated'}});


  }

  //firstName, lastName, phoneNumber, dateOfBirth, description,city,province,country

}
