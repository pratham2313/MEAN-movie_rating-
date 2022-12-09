import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RateService {
  url : string ='https://api.themoviedb.org/3/movie/';
  urltv:string='https://api.themoviedb.org/3/tv/'
  url1 : string ='https://api.themoviedb.org/3';
  url2 :string ='http://localhost:3000';
  id1!:any;
  rate1:any;
  name:any;
  rdate:any;
  bgpath:any;
  email1:any;
  email2:any;
  body = { };
  body1={};

  savedata(id:any,rate:any,title:any,date:any,bg:any,email:any){
    this.body={
      id1 : id,
      rate1: rate,
      name:title,
      rdate:date,
      bgpath:bg,
      email1:email,
    }
    this.passdata(this.body);
  }
  
  constructor(private http: HttpClient) { }

  requestsession(){
    return this.http.get<any>(this.url1+'/authentication/guest_session/new?api_key='+environment.api_key)
  }
  passdata(data:any){
    return this.http.post<any>(this.url2+'/userrate',data).subscribe(res=>{
      console.log('i am sucessfully pass jai swaminarayan and jai ganesha');
    })
  }
  getuserratedata(data:any){
    return this.http.post<any>(this.url2+'/userratedata',data);
  }
  


}
