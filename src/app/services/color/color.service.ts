import { Injectable } from '@angular/core';

import p5 from 'p5';
import {Pallete} from "../../classes/Pallete";
@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor() { }

  getColorList(): Pallete[] {
    return [
      new Pallete('violet', 'rgb(148, 0, 211)'),
      new Pallete('indigo', 'rgb(75, 0, 130)'),
      new Pallete('blue', 'rgb(0, 0, 255)'),
      new Pallete('green', 'rgb(0, 255, 0)'),
      new Pallete('yellow', 'rgb(255, 255, 0)'),
      new Pallete('orange', 'rgb(255, 127, 0)'),
      new Pallete('red', 'rgb(255, 0, 0)')
    ]
  }
}
