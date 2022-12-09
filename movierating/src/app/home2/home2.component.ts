import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Movie } from '../Model/movie';
import { DataService } from '../Service/data.service';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { TryService } from '../Service/try.service';

@Component({
  selector: 'app-home2',
  templateUrl: './home2.component.html',
  styleUrls: ['./home2.component.css']
})
export class Home2Component implements OnInit {


  mydate = Date.now();
  count: number = 0;
  date!: string;
  slideIndex:any = 1;
 


  latestmovie!: any;
  tvpop!:Movie;
  popularmovie!: Movie;
  nowplayingmovies!: any;
  nowplayingmovies1!: Movie;
  topratedmovie!: Movie;
  upcomingmovie!: Movie;
  trendingmovie!: Movie;
  originals!: Movie;
  value1:any;
  play!:any;
  playbool:boolean=false;
  videokey: any;

  constructor(private dataService: DataService,private router:Router,private tryservice:TryService) {
    //this.getreload();
    
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


  }
  // getreload(){
  //   if (!localStorage.getItem('foo')) { 
  //     localStorage.setItem('foo', 'no reload') 
  //     location.reload() 
  //   } else {
  //     localStorage.removeItem('foo') 
  //   }
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
      //console.log("playng");
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
  gettvShowpopular() {
    this.dataService.gettvShowpopular().subscribe(res => {
      this.tvpop = this.modifyData(res);
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
    this.play =res;
    this.videokey=this.modifyData1(this.play);
    console.log("video data");
    console.log(this.play);
    console.log(this.videokey);
    this.playbool=true;
  }, err => {
    console.log('Not Able to get popular movie');
  })

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
modifyData1(video: any): any {
    
  for(let i=0;i<video.results.length;i++){
    if(video.results[i].name=="Official Trailer"){
      return video.results[i].key;
    }
  }    
  return 0;
}
}
