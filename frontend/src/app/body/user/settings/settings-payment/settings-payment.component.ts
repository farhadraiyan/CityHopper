import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

// declare let paypal: any;
@Component({
  selector: 'app-settings-payment',
  templateUrl: './settings-payment.component.html',
  styleUrls: ['./settings-payment.component.css']
})
export class SettingsPaymentComponent implements OnInit {

  addScript = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToUrl(){
    window.location.href="https://www.sandbox.paypal.com/ca/signin"
  }
  // ngAfterViewChecked(): void {
  //   //Called after every check of the component's view. Applies to components only.
  //   //Add 'implements AfterViewChecked' to the class.

  //   if(!this.addScript){
  //     this.addPaypalButton().then(()=>{
  //       paypal.Buttons.render('paypal-btn')
  //     })
  //   }
    
  // }
  // async addPaypalButton(){
  //   this.addScript = true;
  //   return new Promise((resolve, reject) => {
  //     let scriptElem = document.createElement('script');
  //     scriptElem.src="https://www.paypal.com/sdk/js?client-id=sb&currency=USD";
  //     scriptElem.onload = resolve;
  //     document.body.appendChild(scriptElem)
  //   })
  //   // let scriptElem = document.createElement('script');
  //   // scriptElem.src="https://www.paypal.com/sdk/js?client-id=sb";
  //   // await scriptElem.onload;
  //   // document.body.appendChild(scriptElem);
  // }

}
