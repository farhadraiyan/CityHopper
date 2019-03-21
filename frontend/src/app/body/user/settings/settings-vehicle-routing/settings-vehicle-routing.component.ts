import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { CarService } from 'src/app/data-service/car.service';
import { AuthenticationService } from 'src/app/data-service/authentication.service';
import { Car } from 'src/app/models/Car';

@Component({
  selector: 'app-settings-vehicle-routing',
  templateUrl: './settings-vehicle-routing.component.html',
  styleUrls: ['./settings-vehicle-routing.component.css']
})
export class SettingsVehicleRoutingComponent implements OnInit {

  constructor(private activRoute: ActivatedRoute, private auth: AuthenticationService, private carService: CarService) { }

  id: any;
  public carData = [];
  ngOnInit() {
    this.getCarData();
  }

  async getCarData(){
    this.id = this.auth.getUserDetails()['_id']
    console.log(this.id)
    await this.carService.getCarByUserId(this.id).subscribe(
      res => {
          this.carData = res['vehicle']
      }
    )
  }

  deleteCar(carId){
    if(confirm("Are You sure you want to delete this vehicle?"))
    this.carService.deleteCar(carId).subscribe(
      () => {
        this.getCarData();
      }
    )
    return this.carData;
  }
}
