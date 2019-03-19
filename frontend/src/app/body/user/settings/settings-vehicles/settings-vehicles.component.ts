import { Component, OnInit } from '@angular/core';
import { CarService } from '../../../../data-service/car.service';
import { NgForm, NgModel } from '@angular/forms';
import { AuthenticationService } from 'src/app/data-service/authentication.service';
import { UserDataService } from '../../../../data-service/user-data.service';
import { Router } from '@angular/router';
import { Car } from 'src/app/models/Car';
@Component({
  selector: 'app-settings-vehicles',
  templateUrl: './settings-vehicles.component.html',
  styleUrls: ['./settings-vehicles.component.css']
})
export class SettingsVehiclesComponent implements OnInit {

  constructor(private carData: CarService, private authService:AuthenticationService, 
    private _router: Router) { }

  car = new Car();
  id: any;
  userData: any;

  ngOnInit() {
    this.resetForm();
    this.getUserId();
  }

  async getUserId(){
    this.userData = this.authService.getUserDetails(); 
    this.id = this.userData['_id']
    console.log(this.id)  
  }

  addCar(){
    this.carData.addCar(this.car,this.id).subscribe(
      (res) =>{
        console.log(res)
      },
      (err)=>{
        console.log(err)
      }
    )
  }

  resetForm(form?:NgForm){
    if(form != null){
      form.reset();
      this.car.make = "";
      this.car.model = "";
      this.car.year = 0;
      this.car.color = "";
      this.car.type = "";
      this.car.licencePlateNum = "";
      this.car.luggageCapacity = 0;
      this.car.seatCapacity=0;
    }

  }
}
