import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { movieid } from './id';

@Injectable({
  providedIn: 'root'
})
export class TryService {
  url :string ='http://localhost:3000';
  id1!:number;
  body = { };
  body2={};
  constructor(private http: HttpClient) { }

  getid(id:string){
    this.body={
      id1: id
    }
    console.log(this.body);
    this.passid(this.body);
  }

  rid(id:string){
    this.body2={
      id1: id
    }
    this.passrateid(this.body2);
  }

  getdata():Observable<any>{
    return this.http.get<any>(this.url+'/addid');
  }

  getratedata():Observable<any>{
    return this.http.get<any>(this.url+'/rateid');
  }
  getratedata1():Observable<any>{
    return this.http.get<any>(this.url+'/rateid');
  }
  passid(data:any){
    return this.http.post<any>(this.url+'/addid',data).subscribe(res=>{
      console.log('i am sucessfully pass jai swaminarayan and jai ganesha');
    })
  }

  passrateid(data:any){
    return this.http.post<any>(this.url+'/rateid',data).subscribe(res=>{
      console.log('i am sucessfully pass jai swaminarayan and jai ganesha');
    })
  }

  tvid(data:any){
    return this.http.post<any>(this.url+'/addid',data).subscribe(res=>{
      console.log('i am sucessfully pass jai swaminarayan and jai ganesha');
    })
  }

}
