import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RatingComponent} from '../app/rating/rating.component';
import{HomeComponent} from '../app/home/home.component';
import{MovieComponent} from '../app/movie/movie.component';
import{ProfileComponent} from '../app/profile/profile.component';
import{SeriesComponent} from '../app/series/series.component';
import { SingleviewComponent } from './singleview/singleview.component';
import { SingletvComponent } from './singletv/singletv.component';
import { UserrateComponent } from './userrate/userrate.component';
import {AuthGuard} from '@auth0/auth0-angular'



const routes: Routes = [
  {path:'movie',component:MovieComponent},
  {path:'series',component:SeriesComponent},
  {path:'profile',component:ProfileComponent,canActivate:[AuthGuard]},
  {path:'rating',component:RatingComponent,canActivate:[AuthGuard]},
  {path:'',component:HomeComponent},
  {path:'home',component:HomeComponent},
  {path:'singleview',component:SingleviewComponent},
  {path:'singletv',component:SingletvComponent},
  {path:'userrate',component:UserrateComponent,canActivate:[AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
