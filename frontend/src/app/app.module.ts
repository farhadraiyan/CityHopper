import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BodyComponent } from './body/body.component';
import { HomeComponent } from './body/home/home.component';



const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },

  { path: '**', component: HomeComponent }

]


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    HomeComponent
  ],
  exports: [ RouterModule ],

  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }














