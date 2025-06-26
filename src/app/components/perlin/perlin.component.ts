import {Component, OnInit} from '@angular/core';
import {addDoc, collection, Firestore, getDocs} from "@angular/fire/firestore";
import p5 from "p5";

@Component({
  selector: 'app-perlin',
  templateUrl: './perlin.component.html',
  styleUrl: './perlin.component.scss',
  standalone: false
})
export class PerlinComponent implements OnInit  {
  canvas: any;
  sw = 2;
  c:any = [];

  width = screen.width;
  height = screen.height;

  rez1 = 0.01;
  // noprotect
  z = 1000;

  constructor() {

  }

  ngOnInit() {
    console.log(this.width)
    console.log(this.height)
    const sketch = (s: p5) => {
      s.setup = () => {
        let canvas2 = s.createCanvas(this.width, this.height);
        // creating a reference to the div here positions it so you can put things above and below
        // where the sketch is displayed
        canvas2.parent('perlin-holder');

        s.background(255);
        s.colorMode('hsb', 360, 100, 100, 255);
        s.noStroke();
      };

      s.draw = () => {
        this.perlinLoop(s);
      };

      s.mouseReleased = () => {
      };

      s.keyPressed = () => {
        if (s.key === 'c') {
          window.location.reload();
        }
      };
    };

    this.canvas = new p5(sketch);
  }

  perlinLoop(s: p5) {
    var col, n1;


    for (let x = 0; x < this.width; x+=3) {
      for (let y = 0; y < this.height; y+=3) {
        n1 = s.noise(x * this.rez1, y * this.rez1, this.z * this.rez1);
        n1 = s.map(n1, 0.3, 0.7, 0, 1);
        if (n1 < 0) {
          n1 += 1;
        }
        if (n1 > 1) {
          n1--;
        }
        // if (n1 < 0.2) {
        //   col = 36; //orange
        // } else if (n1 < 0.4) {
        //   col = 108; //yellow
        // } else if (n1 < 0.6) {
        //   col = 180; //light blue
        // } else if (n1 < 0.8) {
        //   col = 255; //grape
        // } else {
        //   col = 360; //rose
        // }

        s.fill(n1 * 90, 100, 100, 100);
        s.square(x, y, 3);
      }
    }
    this.z += 1;
  }

}
