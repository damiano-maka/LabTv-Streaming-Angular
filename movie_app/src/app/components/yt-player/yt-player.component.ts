import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-youtube-player',
  template: `
    <div class="trailer-frame">
      <iframe
        width="560"
        height="315"
        [src]="getVideoUrl()"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>
  `,
  styles: [
    `
      .trailer-frame {
        position: relative;
        width: 100%;
        height: 0;
        padding-bottom: 56.25%;
      }

      iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    `,
  ],
})
export class YoutubePlayerComponent implements OnInit {
  @Input() videoKey: string = '';
  videoUrl: SafeResourceUrl | undefined;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.videoKey}`);
  }

  getVideoUrl(): SafeResourceUrl | undefined {
    return this.videoUrl;
  }
}
