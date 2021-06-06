import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorWidgetComponent } from './sensor-widget.component';

describe('SensorWidgetComponent', () => {
  let component: SensorWidgetComponent;
  let fixture: ComponentFixture<SensorWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SensorWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
