import { Component, Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Movie } from '../Model/movie';
import { DataService } from '../Service/data.service';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Observable} from 'rxjs';
import { __extends } from 'tslib';
import { AppComponent } from '../app.component';
import {Router} from '@angular/router';
import { TryService } from '../Service/try.service';
import { movieid } from '../Service/id';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  mydate = Date.now();
  count: number = 0;
  date!: string;
  data="test";

  
  allmovie!:Movie;
  latestmovie!: Movie;
  popularmovie!: Movie;
  nowplayingmovies!: any;
  nowplayingmovies1!: Movie;
  topratedmovie!: Movie;
  upcomingmovie!: Movie;
  trendingmovie!: Movie;
  originals!: Movie;
  value1:any;
  play!:any;
  tvpop!: Movie;
  findid!:any;
  searchmovie!:Movie;
  constructor(private dataService: DataService,private router:Router,private tryservice:TryService,private http: HttpClient) {
    
  }

  ngOnInit(): void {
    this.getLatestMovie();
    this.getPopularMovie();
    this.getNowPlayingMovie();
    this.getTopRatedMovie();
    this.getUpcomingMovie();
    this.getTrendingMovie();
    this.getOriginals();
    this.getNowPlayingMovie1();
    this.gettvShowpopular();
    
    
    // this.getallmovie();
    this.value1=this.transform(this.mydate);
    console.log(this.searchmovie);
    

  }
  gettvShowpopular() {
    this.dataService.gettvShowpopular().subscribe(res => {
      this.tvpop = this.modifyData(res);
    }, err => {
      console.log('trending Not Able to get popular movie');
    })


  }
  onSelect(){
    this.router.navigate(['/singleview']);
}
  // getallmovie(){
  //   this.dataService.getallmovie().subscribe(res => {
  //     this.allmovie = this.modifyData(res);
  //   }, err => {
  //     console.log('trending Not Able to get popular movie');
  //   })
  // }

  getLatestMovie() {
    this.dataService.getLatestMovie().subscribe(res => {
      this.latestmovie = this.modifyData(res);
      console.log(this.latestmovie);
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

  getPopularMovie() {
    this.dataService.getPopularMovie().subscribe(res => {
      this.popularmovie = this.modifyData(res);
      console.log(this.popularmovie);
    }, err => {
      console.log('popular Not Able to get popular movie');
    })


  }

  getNowPlayingMovie() {
    this.dataService.getNowPlayingMovie().subscribe(res => {
      this.nowplayingmovies = this.modifyData(res);
     
    }, err => {
      console.log('now playing Not Able to get popular movie');
    })


  }
  getNowPlayingMovie1() {
    this.dataService.getNowPlayingMovie1().subscribe(res => {
      this.nowplayingmovies1 = this.modifyData(res);
      console.log("playng");
      //console.log(getid1.hi());
      console.log(this.nowplayingmovies1);
    }, err => {
      console.log('now playing 1 Not Able to get popular movie');
    })


  }
  getTopRatedMovie() {
    this.dataService.getTopRatedMovie().subscribe(res => {
      this.topratedmovie = this.modifyData(res);
    }, err => {
      console.log('top rated Not Able to get popular movie');
    })


  }

  getTrendingMovie() {
    this.dataService.getTrendingMovie().subscribe(res => {
      this.trendingmovie = this.modifyData(res);
    }, err => {
      console.log('trending Not Able to get popular movie');
    })


  }

  getUpcomingMovie() {
    this.dataService.getUpcomingMovie().subscribe(res => {
      this.upcomingmovie =this.modifyData(res);
      console.log(this.upcomingmovie);
    }, err => {
      console.log('upcoming Not Able to get popular movie');
    })


  }

  getOriginals() {
    this.dataService.getOriginals().subscribe(res => {
      this.originals =this.modifyData(res);
    }, err => {
      console.log('Not Able to get popular movie');
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
 getsearchmovie(id:any){
  this.dataService.getsearchmovie(id).subscribe(res => {
    this.searchmovie = this.modifyData(res);
    console.log(this.searchmovie);
    
    this.router.navigate(['/singleview']);
  }, err => {
    console.log('Not Able to get popular movie');
  })
  return this.searchmovie;
 }
 getid(id:any){
  console.log('getid function is call');
  this.tryservice.getid(id);
  this.router.navigate(['/singleview']);

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
// @Injectable()

// class takeid extends getid{
  
// }
// const takeid1 = new takeid();
// export function 