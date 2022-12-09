import { Component, Injectable, OnInit } from '@angular/core';
import { DataService } from '../Service/data.service';
import { environment } from 'src/environments/environment';
import { TryService } from '../Service/try.service';
import { Movie } from '../Model/movie';

@Component({
  selector: 'app-singletv',
  templateUrl: './singletv.component.html',
  styleUrls: ['./singletv.component.css']
})
export class SingletvComponent implements OnInit {

  mid!:any
  videokey!:string
  mid2!:string
  searchmovie: any;
  key1:string='077620e08de9093236c48bfbf68ba5d4'
  play!: any;
  constructor(private tryservice:TryService,private dataService:DataService){}

  ngOnInit(): void {
    this.getdata();
  }
  getdata(){
    this.tryservice.getdata().subscribe(res=>{
      this.mid=res;
      console.log(this.mid[0].movieid);
      this.getsearchtvshow(this.mid[0].movieid);
      this.playvideo(this.mid[0].movieid);
    })
  }
  getsearchtvshow(id:any){
    this.dataService.getsearchtvshow(id).subscribe(res => {
      this.searchmovie = this.modifyData(res);
      console.log(this.searchmovie);
      
    }, err => {
      console.log('Not Able to get popular movie');
    })
    return this.searchmovie;
   }
   playvideo(id:any){
    this.dataService.playvideotv(id).subscribe(res => {
      this.play = res
      console.log("video data");
      this.videokey=this.modifyData1(this.play)
      //this.videokey=this.play.results[0].key
      console.log(this.videokey);
      console.log(this.play);
    }, err => {
      console.log('Not Able to get popular movie');
    })
  
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
