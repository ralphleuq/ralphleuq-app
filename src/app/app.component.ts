import {AfterViewInit, Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements OnInit, AfterViewInit {

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.playAudio();
  }

  playAudio(): void {
    const audio = document.getElementById('myAudio') as HTMLAudioElement;
    if (audio) {
      audio.play();
    }
  }
}
