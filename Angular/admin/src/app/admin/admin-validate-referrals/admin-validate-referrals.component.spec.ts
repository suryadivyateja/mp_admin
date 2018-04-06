import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminValidateReferralsComponent } from './admin-validate-referrals.component';

describe('AdminValidateReferralsComponent', () => {
  let component: AdminValidateReferralsComponent;
  let fixture: ComponentFixture<AdminValidateReferralsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminValidateReferralsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminValidateReferralsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
