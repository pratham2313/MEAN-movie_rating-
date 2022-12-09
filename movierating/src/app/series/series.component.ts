import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Movie } from '../Model/movie';
import { DataService } from '../Service/data.service';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TryService } from '../Service/try.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {

  mydate = Date.now();
  count: number = 0;
  date!: string;
 


  

  allmovie!:Movie;
  latesttv!: Movie;
  populartv!: Movie;
  airtv!:Movie;
  onairtv!:Movie;
  topratedtv!:Movie;
  originals!: Movie;
  value1:any;
  play!:any;
  
  constructor(private dataService: DataService,private tryservice:TryService,private router:Router) {
    
    
  }

  ngOnInit(): void {
    this.gettvShowlatest();
    this.gettvShowairing();
    this.gettvShowonair();
    
    this.gettvShowtoprated();
    this.gettvShowpopular();
    this.value1=this.transform(this.mydate);
   
    

  }
  gettvShowpopular() {
    this.dataService.gettvShowpopular().subscribe(res => {
      this.populartv = this.modifyData(res);
      console.log('i am popular');
      console.log(this.populartv);
    }, err => {
      console.log('trending Not Able to get popular movie');
    })


  }
  

  gettvShowlatest() {
    this.dataService.gettvShowlatest().subscribe(res => {
      this.latesttv = this.modifyData(res);
      console.log('i am latest');
      console.log(this.latesttv);
    }, err => {
      console.log('latest Not Able to get movie', err);
    })
  }

  changeData(res: any): any {
    // if(!res.backdrop_path){
    //   res.backdrop_path='https://image.tmdb.org/t/p/original'+res.poster_path+'?api_key='+environment.api_key;
    // }

    res.backdrop_path = 'https://image.tmdb.org/t/p/original/' + res.backdrop_path + '?api_key=' + environment.api_key;

    return res;
  }

  gettvShowairing() {
    this.dataService.gettvShowairing().subscribe(res => {
      this.airtv = this.modifyData(res);
      console.log("i am airtv");
      console.log(this.airtv);
    }, err => {
      console.log('popular Not Able to get popular movie');
    })


  }

  gettvShowonair() {
    this.dataService.gettvShowonair().subscribe(res => {
      this.onairtv = this.modifyData(res);
      console.log("i am on air");
      console.log(this.onairtv);
    }, err => {
      console.log('now playing Not Able to get popular movie');
    })


  }
  gettvShowtoprated() {
    this.dataService.gettvShowtoprated().subscribe(res => {
      this.topratedtv = this.modifyData(res);
      console.log("i am top rated");
      console.log(this.topratedtv);
    }, err => {
      console.log('now playing 1 Not Able to get popular movie');
    })


  }
  

  
  transform(value: any) {
    var datePipe = new DatePipe("en-US");
     value = datePipe.transform(value, 'yyyy');
     
    
     return value;
 }
 playvideo(id:any){
  this.dataService.playvideo(id).subscribe(res => {
    this.play = this.modifyData(res);
    console.log("video data");
    console.log(this.play);
  }, err => {
    console.log('Not Able to get popular movie');
  })

 }
 getid(id:any){
  console.log('getid function is call');
  console.log(id);
  this.tryservice.getid(id);
  this.router.navigate(['/singletv']);

 }

// playvideo(id:any){
//   console.log("hi  i am playvideo method");
// }
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
modifyData1(movies: Movie): Movie {
  if (movies.results) {
    
    movies.results.forEach(element => {
      element.videopath = 'https://www.youtube.com/embed/'+element.key;
      if (element.official) {
        element.key = element.videopath;
      }
    });
  }
  return movies;
}

}
