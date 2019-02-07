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
import { LoginComponent } from './body/user/login/login.component';
import { FormsModule } from '@angular/forms';




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
    LoginComponent

  ],
  exports: [ RouterModule ],

  imports: [
    //RouterModule.forRoot(appRoutes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }














