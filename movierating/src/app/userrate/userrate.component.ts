import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TryService } from '../Service/try.service';
import { RateService } from '../Service/rate.service';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../Service/data.service';
import { Movie } from '../Model/movie';
import { environment } from 'src/environments/environment';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-userrate',
  templateUrl: './userrate.component.html',
  styleUrls: ['./userrate.component.css']
})
export class UserrateComponent implements OnInit {
  searchmovie: any;
  data: any;
  key1:string='077620e08de9093236c48bfbf68ba5d4';
  profileJson: any;

  constructor(private tryservice:TryService,private dataService:DataService,private router:Router,private rateservice:RateService,private http: HttpClient,public auth: AuthService) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(res=>{
      this.profileJson=res;
      console.log(this.profileJson);
      this.rateservice.getuserratedata(this.profileJson).subscribe(res=>
        this.data=res);
    })
    this.getdata();
    
  }
  getdata(){
    
    
    // .subscribe(res=>{
    //   this.data=res;
    //   console.log(this.data[0].userrateid);
    //   console.log(this.data[0].userrate);
    //   console.log(this.data[0].moviename);
    //   console.log(this.data[0].ratedate);
    //   console.log(this.data[0].movieimage);

      
      
    // })
  }
  getsearchmovie(id:any){
    this.dataService.getsearchmovie(id).subscribe(res => {
      this.searchmovie = this.modifyData(res);
      console.log(this.searchmovie);
      
    }, err => {
      console.log('Not Able to get popular movie');
    })
    return this.searchmovie;
   }


   modifyData(movies: Movie): Movie {
    if (movies.results) {
      movies.results.forEach(element => {
        element.backdrop_path = 'https://image.tmdb.org/t/p/original' + element.backdrop_path + '?api_key=' + environment.api_key;
        if (!element.title) {
          element.title = element?.name;
        }
      });
    }
    return movies;
  }
  modifyData1(video: any): any {
    
    for(let i=0;i<video.results.length;i++){
      if(video.results[i].name=="Official Trailer"){
        return video.results[i].key;
      }
    }    
    return 0;
  }

}
