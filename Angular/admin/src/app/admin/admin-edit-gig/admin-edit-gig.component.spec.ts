import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditGigComponent } from './admin-edit-gig.component';

describe('AdminEditGigComponent', () => {
  let component: AdminEditGigComponent;
  let fixture: ComponentFixture<AdminEditGigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditGigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditGigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
