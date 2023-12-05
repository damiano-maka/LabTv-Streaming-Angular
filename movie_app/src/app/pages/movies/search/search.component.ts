import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieType } from 'src/app/models/movie.model';
import { LoaderService } from 'src/app/services/loader.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchQuery: string = '';
  pageNumber: number = 1;
  searchResults: MovieType[] = [];
  error: boolean = false;
  constructor(
    private route: ActivatedRoute,
     private movieService: MovieService ,
    private loader:LoaderService,
    private router: Router,
    ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['s'] || '';
      this.getSearch();
    });
  }


  getSearch() {
    this.loader.open();
    this.movieService.getSearch(this.searchQuery, this.pageNumber).subscribe(
      (data) => {
        if (data.results.length > 0) {
          this.searchResults = data.results;
          this.error = false;
        } else {
          this.error = true;
          this.router.navigate(['movies/**']);
        }
        this.loader.close();
      },
      (error) => {
        console.error('Error during search:', error);
        this.error = true;
        this.loader.close();
        this.router.navigate(['movies/**']); 
      }
    );
  }
  
  addSearchResults():void{this.pageNumber++;this.getSearch();}
  goback():void{this.pageNumber--;this.getSearch();}



}