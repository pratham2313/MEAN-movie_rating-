import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
 // https://imdb-api.com/en/API/Top250Movies/k_vbt8sztv

  url : string ='https://api.themoviedb.org/3/movie/';
  urltv:string='https://api.themoviedb.org/3/tv/'
  url1 : string ='https://api.themoviedb.org/3';
  constructor(private http: HttpClient) { }

  getLatestMovie():Observable<any>{
    return this.http.get<any>(this.url+'latest?api_key='+environment.api_key)
  }

  getPopularMovie(): Observable<any>{
    return this.http.get<any>(this.url+'popular?api_key='+environment.api_key)
  }

  getNowPlayingMovie(): Observable<any>{
    return this.http.get<any>(this.url+'now_playing?api_key='+environment.api_key)
  }
  getNowPlayingMovie1(): Observable<any>{
    return this.http.get<any>(this.url+'now_playing?api_key='+environment.api_key)
  }

  getTopRatedMovie(): Observable<any>{
    return this.http.get<any>(this.url+'top_rated?api_key='+environment.api_key)
  }

  getUpcomingMovie(): Observable<any>{
    return this.http.get<any>(this.url+'upcoming?api_key='+environment.api_key)
  }

  getTrendingMovie(): Observable<any>{
    return this.http.get<any>(this.url1+'/trending/movie/week?api_key='+environment.api_key)
  }

  getOriginals(): Observable<any>{
    return this.http.get<any>(this.url1+'/discover/tv?api_key='+environment.api_key)
  }
  gettvShowpopular(): Observable<any>{
    return this.http.get<any>(this.url1+'/tv/popular?api_key='+environment.api_key)
  }
  gettvShowlatest(): Observable<any>{
    return this.http.get<any>(this.url1+'/tv/latest?api_key='+environment.api_key)
  }
  gettvShowairing(): Observable<any>{
    return this.http.get<any>(this.url1+'/tv/airing_today?api_key='+environment.api_key)
  }
  gettvShowonair(): Observable<any>{
    return this.http.get<any>(this.url1+'/tv/on_the_air?api_key='+environment.api_key)
  }
  gettvShowtoprated(): Observable<any>{
    return this.http.get<any>(this.url1+'/tv/top_rated?api_key='+environment.api_key)
  }
  getsearchmovie(id:any): Observable<any>{
    return this.http.get<any>(this.url+id+'?api_key='+environment.api_key+'&append_to_response=videos');
  }
  getsearchtvshow(id:any): Observable<any>{
    return this.http.get<any>(this.urltv+id+'?api_key='+environment.api_key+'&append_to_response=videos');
  }
  // getallmovie():Observable<any>{
  //   return (this.http.get<any>(this.url+'now_playing?api_key='+environment.api_key),
  //   this.http.get<any>(this.url+'latest?api_key='+environment.api_key),
  //   this.http.get<any>(this.url+'popular?api_key='+environment.api_key),
  //   this.http.get<any>(this.url+'top_rated?api_key='+environment.api_key),
  //   this.http.get<any>(this.url+'upcoming?api_key='+environment.api_key)
  

  //   )
  // }
  playvideo(id:any): Observable<any>{
    return this.http.get<any>(this.url+id+'/videos?api_key='+environment.api_key)
  }
  playvideotv(id:any): Observable<any>{
    return this.http.get<any>(this.urltv+id+'/videos?api_key='+environment.api_key)
  }
  
}
