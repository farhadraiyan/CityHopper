import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BodyComponent } from './body/body.component';
import { HomeComponent } from './body/home/home.component';
import { RegisterComponent } from './body/user/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from '@agm/core';
import { TripComponent } from './body/trip/trip.component';
import { PosttripComponent } from './body/trip/posttrip/posttrip.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmDirectionModule } from 'agm-direction';


import { SettingsRootComponent } from './body/user/settings/settings-root/settings-root.component';
import { SettingsPersonalDetailsComponent } from './body/user/settings/settings-personal-details/settings-personal-details.component';
import { SettingsVehiclesComponent } from './body/user/settings/settings-vehicles/settings-vehicles.component';
import { SettingsPaymentComponent } from './body/user/settings/settings-payment/settings-payment.component';
import { LoginComponent } from './body/user/login/login.component';
import { PasswordvalidationDirective } from './directives/passwordvalidation.directive';
import { ProfilePageComponent } from './body/user/profile-page/profile-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MessageComponent } from './body/message/message.component';
import { SettingsVehicleRoutingComponent } from './body/user/settings/settings-vehicle-routing/settings-vehicle-routing.component';
import { ViewTripsComponent } from './body/trip/view-trips/view-trips.component';
import { SettingsVehicleUpdatesComponent } from './body/user/settings/settings-vehicle-updates/settings-vehicle-updates.component';
import { SettingsSecurityComponent } from './body/user/settings/settings-security/settings-security.component';
import { SettingsChangePasswordComponent } from './body/user/settings/settings-change-password/settings-change-password.component';
import { FilterPipe } from '../filter';
import { ViewSpecificTripComponent } from './body/trip/view-specific-trip/view-specific-trip.component';
import { TripArchiveComponent } from './body/trip/trip-parent/trip-archive/trip-archive.component';
import { TripRequestComponent } from './body/trip/trip-parent/trip-request/trip-request.component';
import { TripUpcomingComponent } from './body/trip/trip-parent/trip-upcoming/trip-upcoming.component'
import { TripParentComponent } from './body/trip/trip-parent/trip-parent.component'



// const appRoutes: Routes = [
//   {
//     path: '',
//     component: HomeComponent
//   },
//   {
//     path: '',
//     redirectTo: '',
//     pathMatch: 'full'
//   },

//   { path: '**', component: HomeComponent }

// ]


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    HomeComponent,
    RegisterComponent,
    TripComponent,
    PosttripComponent,
    SettingsRootComponent,
    SettingsPersonalDetailsComponent,
    SettingsVehiclesComponent,
    SettingsPaymentComponent,
    LoginComponent,
    PasswordvalidationDirective,
    ProfilePageComponent,
    MessageComponent,
    SettingsVehicleRoutingComponent,
    ViewTripsComponent,
    SettingsVehicleUpdatesComponent,
    SettingsSecurityComponent,
    SettingsChangePasswordComponent,
    ViewTripsComponent,
    FilterPipe,
    ViewSpecificTripComponent,
    TripArchiveComponent,
    TripRequestComponent,
    TripUpcomingComponent,
    TripParentComponent


  ],
  exports: [RouterModule],

  imports: [
    //RouterModule.forRoot(appRoutes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyByS3ej9cs4aNa9YsnHtvkPudbpRFafs7U",
      libraries: ["places"]
    }),
    AgmDirectionModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }














