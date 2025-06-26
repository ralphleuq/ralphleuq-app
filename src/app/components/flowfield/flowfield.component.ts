import {Component, OnInit} from '@angular/core';
import p5 from "p5";

@Component({
  selector: 'app-flowfield',
  templateUrl: './flowfield.component.html',
  styleUrl: './flowfield.component.scss',
  standalone: false
})
export class FlowfieldComponent implements OnInit  {
  canvas: any;

  width = 400;
  height = 400;

  inc = 0.02;
  xoff = 0;
  yoff = 0;
  constructor() {

  }

  ngOnInit() {
    const sketch = (s: p5) => {
      s.setup = () => {
        let canvas2 = s.createCanvas(this.width, this.height);
        // creating a reference to the div here positions it so you can put things above and below
        // where the sketch is displayed
        canvas2.parent('flowfield-holder');
      };

      s.draw = () => {
        s.background(0);

        // let x = s.noise(this.xoff) * this.width;
        // let y = s.noise(this.xoff + 10) * this.height;
        //
        // s.ellipse(x, y, 11, 11);

        s.stroke(255);
        s.noFill();
        s.beginShape();
        for (let b = 0; b < this.height; b++) {
          // let y = s.random(this.height);
          let y = s.noise(this.xoff) * this.height;
          s.vertex(b, y);
          this.xoff += this.inc;
        }
        s.endShape()

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

}

