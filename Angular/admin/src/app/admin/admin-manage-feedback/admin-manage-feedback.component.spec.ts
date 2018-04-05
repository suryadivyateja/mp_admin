import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageFeedbackComponent } from './admin-manage-feedback.component';

describe('AdminManageFeedbackComponent', () => {
  let component: AdminManageFeedbackComponent;
  let fixture: ComponentFixture<AdminManageFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminManageFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManageFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
