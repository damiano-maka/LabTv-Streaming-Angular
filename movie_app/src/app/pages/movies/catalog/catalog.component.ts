import { Component, ElementRef } from '@angular/core';
import { MovieType } from 'src/app/models/movie.model';
import { LoaderService } from 'src/app/services/loader.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent {

  trendingList: MovieType[] = [];
  actionList: MovieType[] = [];
  animationList: MovieType[] = [];
  thrillerList: MovieType[] = [];
  comedyList: MovieType[] = [];
  documentaryList: MovieType[] = [];


  trendingPage: number = 1;
  actionPage: number = 1;
  animationPage: number = 1;
  thrillerPage: number = 1;
  comedyPage: number = 1;
  documentaryPage:number = 1;


  constructor(
    private movieService: MovieService, private loader:LoaderService,private el: ElementRef,
  ) {
    this.getTrending();
    this.getAction();
    this.getAnimation();
    this.getThriller();
    this.getComedy();
    this.getDocumentary();
  }

  scrollToCatalog() {
    const catalogElement = this.el.nativeElement.querySelector('#catalog');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  getTrending() {
    this.loader.open();
    this.movieService.getMovie(this.trendingPage).subscribe((data) => {
      this.trendingList = data.results;
      this.loader.close();
    });
  } 

  addMoreTrending():void{this.trendingPage++;this.getTrending();}
  gobackTrending():void{this.trendingPage--;this.getTrending();}

  getAction() {
    this.loader.open();
    this.movieService.AdventureMovies(this.actionPage).subscribe((data) => {
      this.actionList = data.results;
      this.loader.close();
    });
  }
  addMoreAction():void{this.actionPage++;this.getAction();}
  gobackAction():void{this.actionPage--;this.getAction();}

  getAnimation() {
    this.loader.open();
    this.movieService.AnimationMovies(this.animationPage).subscribe((data) => {
      this.animationList = data.results;
      this.loader.close();
    });
  }
  addMoreAnimation():void{this.animationPage++;this.getAnimation();}
  gobackAnimation():void{this.animationPage--;this.getAnimation();}


  getThriller() {
    this.loader.open();
    this.movieService.ThrillerMovies(this.thrillerPage).subscribe((data) => {
      this.thrillerList = data.results;
      this.loader.close();
    });
  }
  addMoreThriller():void{this.thrillerPage++;this.getThriller();}
  gobackThriller():void{this.thrillerPage--;this.getThriller();}


  getComedy() {
    this.loader.open();
    this.movieService.ComedyMovies(this.comedyPage).subscribe((data) => {
      this.comedyList = data.results;
      this.loader.close();
    });
  }
  addMoreComedy():void{this.comedyPage++;this.getComedy();}
  gobackComedy():void{this.comedyPage--;this.getComedy();}

  getDocumentary() {
    this.loader.open();
    this.movieService.DocumentaryMovies(this.documentaryPage).subscribe((data) => {
      this.documentaryList = data.results;
      this.loader.close();
    });
  }
  addMoreDocumentary():void{this.documentaryPage++;this.getDocumentary();}
  gobackDocumentary():void{this.documentaryPage--;this.getDocumentary();}




}
