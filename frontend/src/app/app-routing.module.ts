import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BodyComponent } from './body/body.component';
import { HomeComponent } from './body/home/home.component';
import { RegisterComponent } from './body/user/register/register.component';
import { PosttripComponent } from './body/trip/posttrip/posttrip.component';
import { LoginComponent } from './body/user/login/login.component';
import { SettingsRootComponent } from './body/user/settings/settings-root/settings-root.component';
import { SettingsPersonalDetailsComponent } from './body/user/settings/settings-personal-details/settings-personal-details.component';
import { SettingsVehiclesComponent } from './body/user/settings/settings-vehicles/settings-vehicles.component';
import { SettingsPaymentComponent } from './body/user/settings/settings-payment/settings-payment.component';
import { ProfilePageComponent } from './body/user/profile-page/profile-page.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'postTrip',
    component: PosttripComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
   {
    path: 'profilePage',
    component: ProfilePageComponent
  },
  {
    path: 'settings',
    component: SettingsRootComponent,
    children: [{
      path: 'personaldetails',
      component: SettingsPersonalDetailsComponent
    },{
      path: 'payment',
      component: SettingsPaymentComponent
    },{
      path: 'vehicles',
      component: SettingsVehiclesComponent
    }]
  }

 // { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
