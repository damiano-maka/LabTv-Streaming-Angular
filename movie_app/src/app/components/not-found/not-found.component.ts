import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
  constructor(private router: Router) {}

  goBack() {
    const previousUrl = this.router.url;
    if (previousUrl.includes('/movies')) {
      this.router.navigate(['/movies/catalog']);
    } else {
      this.router.navigate(['/movies/catalog']);
    }
  }
}