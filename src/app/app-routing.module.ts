import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {P5Component} from "./p5/p5.component";
import {HomeComponent} from "./home/home.component";
import {PerlinComponent} from "./perlin/perlin.component";
import {FlowfieldComponent} from "./flowfield/flowfield.component";
import {IntroComponent} from "./intro/intro.component";
import {WowComponent} from "./wow/wow.component";

const routes: Routes = [

  { path: "", component: IntroComponent, pathMatch: "full" },
  { path: "home",
    component: HomeComponent,
    children: [
      { path: "p5", component: P5Component, pathMatch: "full" },
      { path: "perlin", component: PerlinComponent, pathMatch: "full" },
      { path: "flowfield", component: FlowfieldComponent, pathMatch: "full" },
      { path: "wow", component: WowComponent, pathMatch: "full" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
