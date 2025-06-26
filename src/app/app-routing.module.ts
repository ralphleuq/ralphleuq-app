import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {P5Component} from "./components/p5/p5.component";
import {HomeComponent} from "./components/home/home.component";
import {PerlinComponent} from "./components/perlin/perlin.component";
import {FlowfieldComponent} from "./components/flowfield/flowfield.component";
import {IntroComponent} from "./components/intro/intro.component";
import {WowComponent} from "./components/wow/wow.component";
import {TimangTvComponent} from "./components/timang-tv/timang-tv.component";

const routes: Routes = [

  { path: "", component: IntroComponent, pathMatch: "full" },
  { path: "home",
    component: HomeComponent,
    children: [
      { path: "p5", component: P5Component, pathMatch: "full" },
      { path: "perlin", component: PerlinComponent, pathMatch: "full" },
      { path: "flowfield", component: FlowfieldComponent, pathMatch: "full" },
      { path: "wow", component: WowComponent, pathMatch: "full" },
      { path: "timang-tv", component: TimangTvComponent, pathMatch: "full" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
