import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { CarService } from 'src/app/data-service/car.service';
import { Car } from 'src/app/models/Car';

@Component({
  selector: 'app-settings-vehicle-updates',
  templateUrl: './settings-vehicle-updates.component.html',
  styleUrls: ['./settings-vehicle-updates.component.css']
})
export class SettingsVehicleUpdatesComponent implements OnInit {

  constructor(private carService: CarService ,private _router: ActivatedRoute, private router: Router) { }

  carData = new Car();
  private carId: String;

  ngOnInit() {
    this.getCarData();
  }  

  getCarData(){
    this.carId = this._router.snapshot.paramMap.get('carId');
    console.log(this.carId)
    this.carService.getCarById(this.carId).subscribe(
      (res) => {
        this.carData = res['vehicle']
      }
    )
  }
  
  chooseImages(){
    var input = document.getElementById("uploadImg");
    input.click()
  }

  updateCar(){
    this.carService.editCar(this.carData, this.carId).subscribe(
      err =>{
        console.log(err)
      }
    )
  }


}
