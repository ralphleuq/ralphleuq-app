import {AfterViewInit, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss',
  standalone: false
})
export class IntroComponent implements OnInit, AfterViewInit {
  title = 'ralphleuq';

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }
}
