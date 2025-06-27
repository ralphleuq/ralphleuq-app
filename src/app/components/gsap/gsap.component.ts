import {AfterViewInit, Component, HostListener, OnInit} from '@angular/core';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-gsap',
  templateUrl: './gsap.component.html',
  styleUrls: ['./gsap.component.scss'],
  standalone: false
})
export class GsapComponent implements OnInit, AfterViewInit {

  private frame = 0;
  private readonly totalFrames = 23;
  private readonly frameWidth = 220;

  energy = 0; // How fast Rick is dancing
  private lastFrameTime = 0;
  private audio = new Audio('assets/nggyu.mp3');
  private context!: AudioContext;
  private source!: MediaElementAudioSourceNode;
  private bassFilter!: BiquadFilterNode;
  private lastTouchY: number = 0;

  @HostListener('window:click')
  unlockAudioContext() {
    // this.feedEnergy(300);
    if (this.context && this.context.state === 'suspended') {
      this.context.resume().then(() => console.log('Audio resumed'));
    }
  }

  ngOnInit() {
    document.addEventListener('touchmove', e => e.preventDefault(), { passive: false });
  }

  ngAfterViewInit() {
    gsap.registerPlugin(ScrollTrigger);
    this.context = new AudioContext();
    this.source = this.context.createMediaElementSource(this.audio);

// 🎚️ BASS BOOST filter
    this.bassFilter = this.context.createBiquadFilter();
    this.bassFilter.type = 'lowshelf';     // boosts low frequencies
    this.bassFilter.frequency.value = 200; // everything below 200Hz
    this.bassFilter.gain.value = 0;        // default, no boost

// Connect it all
    this.source
      .connect(this.bassFilter)
      .connect(this.context.destination);


    this.audio.loop = true;
    this.audio.preload = 'auto';
    this.audio.playbackRate = 1; // default tempo
    requestAnimationFrame(this.animate.bind(this));
  }

  @HostListener('window:keydown', ['$event'])
  onKey(event: KeyboardEvent) {
    this.feedEnergy(120);
  }

  @HostListener('wheel', ['$event'])
  onScroll(event: WheelEvent) {
    this.unlockAudioContext(); // 👈 added here
    this.feedEnergy(event.deltaY);
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    this.unlockAudioContext();
    if (event.touches.length > 0) {
      const currentY = event.touches[0].clientY;
      const deltaY = (this.lastTouchY - currentY) * 1.7;
      this.feedEnergy(deltaY);
      this.lastTouchY = currentY;
    }
  }

  private feedEnergy(amount: number) {
    // Give Rick energy on every scroll
    this.energy += Math.abs(amount * 0.0005); // adjust this to control pump rate
    if (this.energy > 0.92) {
      this.energy = 1.0;
      this.bassFilter.gain.value = this.energy * 25;
    } else {
      this.bassFilter.gain.value = 1;
    }
  }

  animate(timestamp: number) {
    const box = document.querySelector('.box') as HTMLElement;
    // Audio control

    if (this.energy > 0) {
      if (this.energy < .90){
        this.bassFilter.gain.value = 1;
      }


      // Start music if not already playing
      if (this.audio.paused) {
        this.audio.play().catch(err => console.warn('Audio play failed:', err));
      }

      // 🎵 Adjust playback speed based on energy
      // Clamp between 1x and 2x speed for sanity
      const rate = 0.5 + this.energy * 0.5;
      this.audio.playbackRate = rate;
      this.audio.volume = Math.min(this.energy, 1);;

    } else {
      // Stop music when energy runs out
      if (!this.audio.paused) {
        this.audio.pause();
        // this.audio.currentTime = 0;
      }
    }



    if (this.energy > 0.001) {
      const now = performance.now();
      const delta = now - this.lastFrameTime;

      const effectiveEnergy = Math.max(this.energy, 0.30);
      const frameInterval = 100 / effectiveEnergy; // higher energy = faster frames

      if (delta >= frameInterval) {
        this.lastFrameTime = now;
        this.frame = (this.frame + 1) % this.totalFrames;
        const offset = this.frame * this.frameWidth;
        if (box) box.style.backgroundPosition = `-${offset}px 0px`;
      }

      // Apply decay
      const decayRate = 0.02;
      const maxDecay = 0.004;
      const decay = Math.min(this.energy * decayRate, maxDecay);
      this.energy -= decay;
      // if (this.energy < 0.01) this.energy = 0;
    }

    requestAnimationFrame(this.animate.bind(this));
  }
}
