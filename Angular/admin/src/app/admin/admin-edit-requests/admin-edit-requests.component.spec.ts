import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditRequestsComponent } from './admin-edit-requests.component';

describe('AdminEditRequestsComponent', () => {
  let component: AdminEditRequestsComponent;
  let fixture: ComponentFixture<AdminEditRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
