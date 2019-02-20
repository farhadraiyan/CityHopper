import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'


@Component({
  selector: 'app-settings-root',
  templateUrl: './settings-root.component.html',
  styleUrls: ['./settings-root.component.css']
})
export class SettingsRootComponent implements OnInit {

  constructor(private _route: ActivatedRoute) { }

  message:any;
  ngOnInit() {

    this._route.queryParams.subscribe(params => {this.message =params['authentication']});
    console.log(this.message)
  }

  goToVehicles () {
  }
}
