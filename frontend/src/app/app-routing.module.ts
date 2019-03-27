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
import { MessageComponent } from './body/user/message/message/message.component';
import { SettingsVehicleRoutingComponent } from './body/user/settings/settings-vehicle-routing/settings-vehicle-routing.component';
import { ViewTripsComponent } from './body/trip/view-trips/view-trips.component';
import { SettingsVehicleUpdatesComponent } from './body/user/settings/settings-vehicle-updates/settings-vehicle-updates.component';
import { SettingsSecurityComponent } from './body/user/settings/settings-security/settings-security.component';
import { SettingsChangePasswordComponent } from './body/user/settings/settings-change-password/settings-change-password.component';
import { ViewSpecificTripComponent } from './body/trip/view-specific-trip/view-specific-trip.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'viewTrips',
    component: ViewTripsComponent
  },{
    path: 'viewSpecificTrip',
    component: ViewSpecificTripComponent
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
    path: 'message',
    component: MessageComponent
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
      path: 'vehicles-routing',
      component: SettingsVehicleRoutingComponent,
    },
    {
      path: 'add-A-Vehicles',
      component: SettingsVehiclesComponent
    },
    {
      path: 'update-A-Vehicles/:carId',
      component: SettingsVehicleUpdatesComponent
    },
    {
      path: 'email-settings',
      component: SettingsSecurityComponent
    },
    {
      path: 'password-settings',
      component: SettingsChangePasswordComponent
    }]
  }

 // { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
