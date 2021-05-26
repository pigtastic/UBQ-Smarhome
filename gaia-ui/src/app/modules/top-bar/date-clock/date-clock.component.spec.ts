import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateClockComponent } from './date-clock.component';

describe('DateClockComponent', () => {
  let component: DateClockComponent;
  let fixture: ComponentFixture<DateClockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DateClockComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
