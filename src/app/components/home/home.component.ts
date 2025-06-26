import {AfterViewInit, Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: false
})
export class HomeComponent implements OnInit, AfterViewInit {
  hideContent = true;
  title = 'ralphleuq';

  isSidebarOpen = false;

  constructor() { }

  ngOnInit(): void {
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


  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }
}
