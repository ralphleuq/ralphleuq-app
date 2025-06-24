import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {P5Component} from "./p5/p5.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  { path: "p5", component: P5Component, pathMatch: "full" },
  { path: "", component: HomeComponent, pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
