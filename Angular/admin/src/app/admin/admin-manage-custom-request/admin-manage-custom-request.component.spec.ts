import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageCustomRequestComponent } from './admin-manage-custom-request.component';

describe('AdminManageCustomRequestComponent', () => {
  let component: AdminManageCustomRequestComponent;
  let fixture: ComponentFixture<AdminManageCustomRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminManageCustomRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManageCustomRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
