import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupMenuComponent } from './group-menu.component';

describe('RoomMenuComponent', () => {
  let component: GroupMenuComponent;
  let fixture: ComponentFixture<GroupMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupMenuComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
