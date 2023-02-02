import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/Model/movie';
import { DataService } from 'src/app/Service/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  latestMovie : any;
  popularMovies !:Movie;
  nowPlayingMovies !: Movie;
  topRatedMovies !: Movie;
  upComingMovies !: Movie;
  trendingMovies !: Movie;
  orignals !: Movie;
  constructor(private dataservice : DataService){

  }
  ngOnInit(): void {
   this.getLatestMovie();
   this.getPopularMovies();
   this.getNowPlayingMovies();
   this.getTopRatedMovies();
   this.getTrendingMovies();
   this.getUpcomingMovies();
   this.getOriginals();
  }


getLatestMovie(){
  this.dataservice.getLatestMovie().subscribe(res =>{
  this.latestMovie = this.changeData(res);
}, err =>{
})
}
  changeData(res: any): any {
    if(!res.backdrop_path){
      res.backdrop_path='http://image.tmdb.org/t/p/original'+res.poster_path+'?api_key='+environment.api_key;
    }else{
      res.backdrop_path='http://image.tmdb.org/t/p/original'+res.backdrop_path+'?api_key='+environment.api_key;
    }
    return res;
  }

getPopularMovies(){
  this.dataservice.getPopularMovies().subscribe((res ) =>{
 this.popularMovies = this.modifyData(res);
}, (err ) =>{
})
}

getNowPlayingMovies(){
  this.dataservice.getNowPlayingMovies().subscribe((res ) =>{
 this.nowPlayingMovies = this.modifyData(res);
}, (err ) =>{
  console.log("error while fetching movies",err);
})
}

getTopRatedMovies(){
  this.dataservice.getTopRatedMovies().subscribe((res ) =>{
 this.topRatedMovies = this.modifyData(res);
}, (err ) =>{
  console.log("error while fetching movies",err);
})
}

getUpcomingMovies(){
  this.dataservice.getUpcomingMovies().subscribe((res ) =>{
 this.upComingMovies = this.modifyData(res);
}, (err ) =>{
  console.log("error while fetching movies",err);
})
}

getTrendingMovies(){
  this.dataservice.getTrendingMovies().subscribe((res ) =>{
 this.trendingMovies = this.modifyData(res);
}, (err ) =>{
  console.log("error while fetching movies",err);
})
}

getOriginals(){
  this.dataservice.getOriginals().subscribe((res ) =>{
 this.orignals = this.modifyData(res);
}, (err ) =>{
  console.log("error while fetching movies",err);
})
}


modifyData(movies : Movie) : Movie{
if(movies.results){
movies.results.forEach(element =>{
element.backdrop_path='http://image.tmdb.org/t/p/original'+element.backdrop_path+'?api_key='+environment.api_key;
if(!element.title){
  element.title =element?.name;
}
});
}

return movies;
}

}