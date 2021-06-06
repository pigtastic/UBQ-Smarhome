import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeviceToGroupDialogComponent } from './add-device-to-group-dialog.component';

describe('AddDeviceToGroupDialogComponent', () => {
  let component: AddDeviceToGroupDialogComponent;
  let fixture: ComponentFixture<AddDeviceToGroupDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDeviceToGroupDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDeviceToGroupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
