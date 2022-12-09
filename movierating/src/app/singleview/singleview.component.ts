import { Component, Injectable, OnInit } from '@angular/core';
import { DataService } from '../Service/data.service';
import { environment } from 'src/environments/environment';
import { TryService } from '../Service/try.service';
import { Movie } from '../Model/movie';
import {Router} from '@angular/router'





@Component({
  selector: 'app-singleview',
  templateUrl: './singleview.component.html',
  styleUrls: ['./singleview.component.css']
})

export class SingleviewComponent  implements OnInit  {
  
  mid!:any;
  videokey!:string;
  searchmovie: any;
  key1:string='077620e08de9093236c48bfbf68ba5d4'
  play!: any;
  constructor(private tryservice:TryService,private dataService:DataService,private router:Router){}

  ngOnInit(): void {
    this.getdata();
  }
  getdata(){
    this.tryservice.getdata().subscribe(res=>{
      this.mid=res;
      console.log(this.mid[0].movieid);
      this.getsearchmovie(this.mid[0].movieid);
      this.playvideo(this.mid[0].movieid);
    })
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
   playvideo(id:any){
    this.dataService.playvideo(id).subscribe(res => {
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
   passrateid(id:any){
    console.log('rateid function is call');
    this.tryservice.rid(id);
    this.router.navigate(['/rating']);
  
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




// @Injectable()

// export class getid extends SingleviewComponent {
//   id!:number;
  
//   hi(id:number){
    
//     this.id=id;
//     //console.log('my value'+ this.movie);
    
    
//   }
//   id2:number=this.id;
// }
// const getid1 =new getid();


