import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../../../data-service/user-data.service';
import { AuthenticationService } from 'src/app/data-service/authentication.service';

@Component({
  selector: 'app-settings-personal-details',
  templateUrl: './settings-personal-details.component.html',
  styleUrls: ['./settings-personal-details.component.css']
})
export class SettingsPersonalDetailsComponent implements OnInit {

  constructor(private userData:UserDataService,private authinticateService:AuthenticationService) { }

  id:any;
  user:any;

  async ngOnInit() {
    this.id = this.authinticateService.getUserDetails();
    if(this.id !=null){
    await this.userData.getUserData(this.id['_id']).toPromise().then((res) => {
      this.user = res['user']

    }).catch((err) => {

    });
  }
}


  onSubmit(firstName, lastName, phoneNumber, dateOfBirth, description){

    this.user={firstName:firstName.value,lastName:lastName.value,phoneNumber:phoneNumber.value,dateOfBirth:dateOfBirth.value,description:description.value}
    this.userData.editUser(this.user,this.id['_id']).subscribe(data=>{
      data = this.user;
      console.log(data);
    });



  }


}
