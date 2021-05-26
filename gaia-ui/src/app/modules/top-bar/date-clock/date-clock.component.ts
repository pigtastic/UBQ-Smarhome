import { Component, OnInit } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';

@Component({
  selector: 'date-clock',
  templateUrl: './date-clock.component.html',
  styleUrls: ['./date-clock.component.scss'],
})
export class DateClockComponent implements OnInit {
  today: Date = new Date()

  constructor(public media: MediaObserver) { }

  ngOnInit(): void {
    setInterval(() => {
      this.today = new Date();
    }, 1000);
  }
}
