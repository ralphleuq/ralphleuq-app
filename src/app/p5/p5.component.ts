import {Component, OnInit} from '@angular/core';

import p5 from 'p5'
import {addDoc, collection, Firestore, getDocs} from "@angular/fire/firestore";

@Component({
    selector: 'app-p5',
    templateUrl: './p5.component.html',
    styleUrls: ['./p5.component.scss'],
    standalone: false
})
export class P5Component implements OnInit  {
  canvas: any;
  sw = 2;
  c:any = [];
  strokeColor = 0;

  items = []

  constructor(private firestore: Firestore) {

  }

  ngOnInit() {
    // this sketch was modified from the original
    // https://editor.p5js.org/Janglee123/sketches/HJ2RnrQzN



    var lines: any[] = [];
    const sketch = (s: p5) => {
      s.setup = () => {

        let canvas2 = s.createCanvas(s.windowWidth - 200, s.windowHeight - 200);
        // creating a reference to the div here positions it so you can put things above and below
        // where the sketch is displayed
        canvas2.parent('sketch-holder');

        s.background(255);
        s.strokeWeight(this.sw);

        this.c[0] = s.color(148, 0, 211);
        this.c[1] = s.color(75, 0, 130);
        this.c[2] = s.color(0, 0, 255);
        this.c[3] = s.color(0, 255, 0);
        this.c[4] = s.color(255, 255, 0);
        this.c[5] = s.color(255, 127, 0);
        this.c[6] = s.color(255, 0, 0);

        s.rect(0, 0, s.width, s.height);

        s.stroke(this.c[this.strokeColor]);
        this.initializeLines(s);
      };

      s.draw = () => {
        if (s.mouseIsPressed) {
          if (s.mouseButton === s.LEFT) {
            s.line(s.mouseX, s.mouseY, s.pmouseX, s.pmouseY);
            lines.push({mouseX: s.mouseX, mouseY: s.mouseY, pmouseX: s.pmouseX, pmouseY:s.pmouseY})
          } else if (s.mouseButton === s.CENTER) {
            s.background(255);
          }
        }
      };

      s.mouseReleased = () => {
        // modulo math forces the color to swap through the array provided
        this.strokeColor = (this.strokeColor + 1) % this.c.length;
        s.stroke(this.c[this.strokeColor]);
        console.log(`color is now ${this.c[this.strokeColor]}`);
        this.saveData({data: lines});
      };

      s.keyPressed = () => {
        if (s.key === 'c') {
          window.location.reload();
        }
      };
    };

    this.canvas = new p5(sketch);
  }

  initializeLines(s: p5) {
    const querySnapshot = getDocs(collection(this.firestore, "collection"));
    var initial: any[] = [];

    querySnapshot.then((result) => {
      result.forEach((item) => {
        let loadedLines: any[] = [];
        item.data()['data'].forEach((line: any) => {
          s.line(line.mouseX, line.mouseY, line.pmouseX, line.pmouseY)
        });
        initial.push(loadedLines);
        console.log(initial)
      })
    });

  }

  saveData(data: any) {
    console.log(data);
    const docRef = addDoc(collection(this.firestore, "collection"), data);
  }
}
