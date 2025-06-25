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

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }

}
