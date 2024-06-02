import { CommonModule } from '@angular/common';
import {  Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css',
})
export class TimerComponent implements OnInit, OnDestroy {
  @Input() initialTime: number = 70; 
  @Output() timerEnd = new EventEmitter<void>();
  remainingTime: number;
  private timerId: any;

  constructor() {
    this.remainingTime = this.initialTime;
  }

  ngOnInit(): void {
    this.startTimer();
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  startTimer(): void {
    this.timerId = setInterval(() => {
      this.remainingTime--;
      if (this.remainingTime <= 0) {
        console.log('Emitting timerEnd'); 
        this.timerEnd.emit();
        this.clearTimer();
      }
    }, 1000);
  }

  clearTimer(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }
}
  
