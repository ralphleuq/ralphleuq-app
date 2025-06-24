import {AfterViewInit, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  hideContent = true;
  title = 'ralphleuq';

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

  playAudio(): void {
    this.hideContent = false;
    const audio = document.getElementById('myAudio') as HTMLAudioElement;
    if (audio) {
      audio.play();
    }
  }

}
