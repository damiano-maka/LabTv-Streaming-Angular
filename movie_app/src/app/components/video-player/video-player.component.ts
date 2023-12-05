import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef;
  videoId: string | null;
  id: string | null;
  embedUrl: SafeResourceUrl | undefined;

  constructor(private activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer) {
    this.videoId = null;
    this.id = null;
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.videoId = params.get('id');
      console.log(this.videoId);
      this.embedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://gomo.to/movie/${this.videoId}`)
      console.log(this.embedUrl);
    });
  }

/*   ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.videoId = params.get('id');
      this.id = this.videoId ? Number(this.videoId) : null;
      this.embedUrl = this.id
        ? this.sanitizer.bypassSecurityTrustResourceUrl(`https://movie.smashystream.xyz/#/media/tmdb-movie-${this.id}`)
        : undefined;
    });
  }
 */
  toggleFullScreen() {
    const videoElem = this.videoPlayer.nativeElement;

    if (videoElem.requestFullscreen) {
      videoElem.requestFullscreen();
    } else if (videoElem.mozRequestFullScreen) { 
      videoElem.mozRequestFullScreen();
    } else if (videoElem.webkitRequestFullscreen) {
      videoElem.webkitRequestFullscreen();
    } else if (videoElem.msRequestFullscreen) {
      videoElem.msRequestFullscreen();
    }
  }
}