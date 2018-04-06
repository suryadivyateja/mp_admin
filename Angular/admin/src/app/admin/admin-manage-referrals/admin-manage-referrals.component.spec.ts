import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageReferralsComponent } from './admin-manage-referrals.component';

describe('AdminManageReferralsComponent', () => {
  let component: AdminManageReferralsComponent;
  let fixture: ComponentFixture<AdminManageReferralsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminManageReferralsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManageReferralsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
