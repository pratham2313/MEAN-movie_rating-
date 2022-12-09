import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RatingComponent } from './rating/rating.component';
import { HomeComponent } from './home/home.component';
import { MovieComponent } from './movie/movie.component';
import { SeriesComponent } from './series/series.component';
import { ProfileComponent } from './profile/profile.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { SingleviewComponent } from './singleview/singleview.component';
import { SingletvComponent } from './singletv/singletv.component';
import { UserrateComponent } from './userrate/userrate.component';
import { Home2Component } from './home2/home2.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component'
import {AuthModule} from '@auth0/auth0-angular'
import {environment as env} from '../environments/environment'

@NgModule({
  declarations: [
    AppComponent,
    RatingComponent,
    HomeComponent,
    MovieComponent,
    SeriesComponent,
    ProfileComponent,
    NavComponent,
    FooterComponent,
    SingleviewComponent,
    SingletvComponent,
    UserrateComponent,
    Home2Component,
    LoginComponent,
    RegistrationComponent,

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxStarRatingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthModule.forRoot({
      ...env.auth,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
