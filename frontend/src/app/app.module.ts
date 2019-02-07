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
    PosttripComponent
  ],
  exports: [ RouterModule ],

  imports: [
    //RouterModule.forRoot(appRoutes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey:"AIzaSyByS3ej9cs4aNa9YsnHtvkPudbpRFafs7U",
      libraries:["places"]
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }














