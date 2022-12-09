import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url2 :string ='http://localhost:3000';

  constructor(private http: HttpClient) { }


  signup(info:any){
    this.passuserdata(info);
  }
  login(info:any){
    this.passlogindata(info);
  }

  passuserdata(data:any){
    return this.http.post<any>(this.url2+'/signup',data)
  }

  passlogindata(data:any){
    return this.http.post<any>(this.url2+'/login',data);
  }
  islogin():Observable<any>{
    return this.http.get<any>(this.url2+'/login');
  }
  updateislogin(data:any){
    return this.http.post<any>(this.url2+'/update',data);
    
  }
}
