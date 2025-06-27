import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {P5Component} from './components/p5/p5.component';
import {HomeComponent} from './components/home/home.component';
import {environment} from "../environments/environment";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {PerlinComponent} from "./components/perlin/perlin.component";
import {FlowfieldComponent} from "./components/flowfield/flowfield.component";
import {IntroComponent} from "./components/intro/intro.component";
import {WowComponent} from "./components/wow/wow.component";
import {TimangTvComponent} from "./components/timang-tv/timang-tv.component";
import {AboutMeComponent} from "./components/about-me/about-me.component";
import {GsapComponent} from "./components/gsap/gsap.component";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    P5Component,
    IntroComponent,
    HomeComponent,
    PerlinComponent,
    FlowfieldComponent,
    WowComponent,
    TimangTvComponent,
    AboutMeComponent,
    GsapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule
  ],
  providers: [
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
