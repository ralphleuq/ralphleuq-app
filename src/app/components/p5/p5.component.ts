import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import p5 from 'p5'
import {addDoc, collection, Firestore, getDocs} from "@angular/fire/firestore";
import {ColorService} from "../../services/color/color.service";
import {Pallete} from "../../classes/Pallete";

@Component({
    selector: 'app-p5',
    templateUrl: './p5.component.html',
    styleUrls: ['./p5.component.scss'],
    standalone: false
})
export class P5Component implements OnInit, AfterViewInit  {
  @ViewChild('sketchholder') sketchHolder!: ElementRef;

  canvas: any;
  sw = 2;
  strokeColor = 0;

  items = []
  palettes: Pallete[] = [];
  selectedColorIndex = 0;
  constructor(
    private colorService: ColorService,
    private firestore: Firestore
  ) {

  }

  ngOnInit() {
    this.palettes = this.colorService.getColorList();
  }

  ngAfterViewInit() {
    // this sketch was modified from the original
    // https://editor.p5js.org/Janglee123/sketches/HJ2RnrQzN
    var lines: any[] = [];
    const sketch = (s: p5) => {

      s.setup = () => {
        let width = this.sketchHolder.nativeElement.clientWidth;
        let height = this.sketchHolder.nativeElement.clientHeight;

        let canvas2 = s.createCanvas(width, height);
        // creating a reference to the div here positions it so you can put things above and below
        // where the sketch is displayed
        canvas2.parent('sketch-holder');

        s.background(255);
        s.strokeWeight(this.sw);
        s.rect(0, 0, s.width, s.height);
        s.stroke(this.palettes[0].colorValue);
        // this.initializeLines(s);
      };

      let drawLine = () => {
        s.line(s.mouseX, s.mouseY, s.pmouseX, s.pmouseY);
        lines.push({mouseX: s.mouseX, mouseY: s.mouseY, pmouseX: s.pmouseX, pmouseY:s.pmouseY})
      }

      s.mouseDragged = () => {
        drawLine();
      };

      s.mouseReleased = () => {
        // this.saveData({data: lines});
      };

      s.keyPressed = () => {
        if (s.key === 'c') {
          window.location.reload();
        }
      };
    };

    this.canvas = new p5(sketch);
  }




  selectColor(selectedColor: string, index: number) {
    this.selectedColorIndex = index;
    // Immediately update stroke if p5 instance is running
    if (this.canvas && typeof this.canvas.stroke === 'function') {
      this.canvas.stroke(selectedColor);
    }
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
      })
    });

  }

  saveData(data: any) {
    console.log(data);
    const docRef = addDoc(collection(this.firestore, "collection"), data);
  }
}
