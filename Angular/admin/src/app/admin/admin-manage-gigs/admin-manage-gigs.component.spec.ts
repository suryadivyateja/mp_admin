import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageGigsComponent } from './admin-manage-gigs.component';

describe('AdminManageGigsComponent', () => {
  let component: AdminManageGigsComponent;
  let fixture: ComponentFixture<AdminManageGigsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminManageGigsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManageGigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
