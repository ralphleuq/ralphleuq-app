import {AfterViewInit, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-wow',
  templateUrl: './wow.component.html',
  styleUrl: './wow.component.scss',
  standalone: false
})
export class WowComponent implements OnInit, AfterViewInit {
  title = 'ralphleuq';

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
  }
}
