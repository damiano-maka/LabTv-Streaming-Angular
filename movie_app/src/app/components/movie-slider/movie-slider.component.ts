import { Component ,ElementRef,EventEmitter,Input, Output } from '@angular/core';
import { MovieType } from 'src/app/models/movie.model';

@Component({
  selector: 'app-movie-slider',
  templateUrl: './movie-slider.component.html',
  styleUrls: ['./movie-slider.component.scss']
})
export class MovieSliderComponent {
 @Input() slider!:MovieType[];
 @Output() down: EventEmitter<void> = new EventEmitter(); 

 scroll(): void {
   this.down.emit();
 }
}


