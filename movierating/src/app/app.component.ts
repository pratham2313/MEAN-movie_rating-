import { Component, OnInit } from '@angular/core';
import{Router} from '@angular/router'
import { Movie } from './Model/movie';
import { TryService } from './Service/try.service';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css',
    
  ]
})
export class AppComponent implements OnInit {
  movie!:Movie;
  valid!:boolean;
  // title = 'movierating';
  
  constructor(private service:TryService,public router: Router,public auth:AuthService){}
  ngOnInit(){
    //this.getDatafromapi();
  }

  check(){
    
  }

  // getDatafromapi(){
  //   this.service.getdata().subscribe((res)=>{
  //     console.log('I think Data Is insert',res);
  //   },(err)=>{
  //     console.log('error',err);
  //   })
  // } 
}
