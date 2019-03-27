import { Component, OnInit } from '@angular/core';
import { CarService } from '../../../../data-service/car.service';
import { NgForm, NgModel } from '@angular/forms';
import { AuthenticationService } from 'src/app/data-service/authentication.service';
import { Router } from '@angular/router';
import { Car } from 'src/app/models/Car';
import { Headers, Http } from '@angular/http';


@Component({
  selector: 'app-settings-vehicles',
  templateUrl: './settings-vehicles.component.html',
  styleUrls: ['./settings-vehicles.component.css']
})
export class SettingsVehiclesComponent implements OnInit {

  constructor(private carData: CarService, private authService:AuthenticationService, 
    private _router: Router,private http: Http) { }

  car = new Car();
  id: any;
  userData: any;

  ngOnInit() {
    this.resetForm();
  }
  
  imageFormData: FormData;

  async onFileChanged(event) {
    console.log(event)
    const file = event.target.files[0]
    const uploadData = new FormData();
    uploadData.append('image', file, file.name);
    this.imageFormData = uploadData
  }

  async addCar(){
    let data = this.car;
    let formData = this.imageFormData
    console.log(formData)
    data.userId = this.authService.getUserDetails()['_id']
    for (let key in data) {
      formData.append(key, data[key])
    }
    await this.http.post('http://localhost:3000/car/register', formData).toPromise().then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })

  }

  chooseImages(){
    var input = document.getElementById("image");
    input.click()
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
      this.car.luggageSize=""
    }

  }
}
