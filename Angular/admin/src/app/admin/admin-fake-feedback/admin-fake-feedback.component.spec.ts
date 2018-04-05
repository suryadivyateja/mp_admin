import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFakeFeedbackComponent } from './admin-fake-feedback.component';

describe('AdminFakeFeedbackComponent', () => {
  let component: AdminFakeFeedbackComponent;
  let fixture: ComponentFixture<AdminFakeFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminFakeFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFakeFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
