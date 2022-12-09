import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { movieid } from '../Service/id';
import { TryService } from '../Service/try.service';
import { DataService } from '../Service/data.service';
import { Movie } from '../Model/movie';
import { environment } from 'src/environments/environment';
import { RateService } from '../Service/rate.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';




@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  public form: FormGroup;
  rid: any;
  searchmovie: any;
  play: any;
  videokey!:string;
  key1:string='077620e08de9093236c48bfbf68ba5d4';
  body = { };
  response!:any;
  ratecount!:any;
  url : string ='https://api.themoviedb.org/3/movie/';
  session: any;
  sessionId!:any;

  mydate = Date.now();
  value1: any;
  profileJson!:any
  
  //moviename:any
  //rating3: number;
  constructor(private fb: FormBuilder,private tryservice:TryService,private dataService:DataService,private router:Router,private rateservice:RateService,private http: HttpClient,public auth: AuthService){
    //this.rating3 = 3;
    
    this.form = this.fb.group({
      rating: ['0', Validators.required],
      moviename:['',Validators.required],
      //rating0:['',Validators.required],
      // rating1:['1',Validators.required],
      // rating2:['2',Validators.required],
      // rating3:['3',Validators.required],
      // rating4:['4',Validators.required],
      // rating5:['5',Validators.required],
      // rating6:['6',Validators.required],
      // rating7:['7',Validators.required],
      // rating8:['8',Validators.required],
      // rating9:['9',Validators.required],
      // rating10:['0',Validators.required],



    })
    //console.log("i am "+this.moviename);
  }

  ngOnInit(): void {
    this.getdata();
    this.value1=this.transform(this.mydate);
    console.log(this.value1);

    this.auth.user$.subscribe(res=>{
      this.profileJson=res;
      console.log(this.profileJson);
    })

  }
  onsubmit(){
    console.log('i am onsubmit');
    let ratinginfo=this.form.value;
   // this.passid1(ratinginfo);
  }
  getdata(){
    this.tryservice.getratedata1().subscribe(res=>{
      this.rid=res;
      console.log(this.rid);
      console.log(this.rid[0].rateid);
      this.getsearchmovie(this.rid[0].rateid);
      this.playvideo(this.rid[0].rateid);
      
    })
  }
  passid(){
    
    this.tryservice.getratedata().subscribe(res=>{
      this.rid=res;
      console.log(this.rid[0].rateid);
      this.rateservice.requestsession().subscribe(res=>{
        this.session=res;
        console.log(this.session.guest_session_id);
        this.sessionId=this.session.guest_session_id;
        this.giveRateToMovie(this.rid[0].rateid,this.form.value.rating,this.sessionId);
      });
      
      
    })
  }

  passdata(id:any,title:any,bg:any){
    console.log('pass data call');
    console.log(this.form.value.rating);
    this.rateservice.savedata(id,this.form.value.rating,title,this.value1,bg,this.profileJson?.email);
    this.router.navigate(['/userrate']);
  }
  giveRateToMovie(id:any,value:any,sid:any){
    console.log(sid);
    this.body = {
      "value": value
    }
    return this.http.post<any>(this.url+id+'/rating'+'/?api_key='+environment.api_key,this.body).subscribe(res=>{
      this.response=res;
      console.log(this.response);
    },err => {
      console.log(err);
  });
    
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
   transform(value: any) {
    var datePipe = new DatePipe("en-US");
     value = datePipe.transform(value, 'dd/MM/yyyy');
     
    
     return value;
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
