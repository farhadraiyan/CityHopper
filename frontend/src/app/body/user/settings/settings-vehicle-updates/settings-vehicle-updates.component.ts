import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { CarService } from 'src/app/data-service/car.service';
import { Car } from 'src/app/models/Car';
import { Headers, Http } from '@angular/http';
@Component({
  selector: 'app-settings-vehicle-updates',
  templateUrl: './settings-vehicle-updates.component.html',
  styleUrls: ['./settings-vehicle-updates.component.css']
})
export class SettingsVehicleUpdatesComponent implements OnInit {

  constructor(private carService: CarService ,private _router: ActivatedRoute, private router: Router, private http: Http) { }

  carData: any;
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

  async onFileChanged(event) {
    console.log(event)
    const file = event.target.files[0]
    const uploadData = new FormData();
    uploadData.append('image', file, file.name);
    uploadData.append('carId',this.carData._id)
    let self = this
    await this.http.post('http://localhost:3000/car/uploadImage', uploadData).toPromise().then((res) => {
      console.log(res['_body'])
      let x = JSON.parse(res['_body'])
      this.carData = x

    }).catch((err) => {
      console.log(err)
    })
  }
  
  chooseImages(){
    var input = document.getElementById("image");
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
