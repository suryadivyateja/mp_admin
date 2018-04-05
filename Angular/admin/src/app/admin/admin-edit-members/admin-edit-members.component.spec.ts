import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditMembersComponent } from './admin-edit-members.component';

describe('AdminEditMembersComponent', () => {
  let component: AdminEditMembersComponent;
  let fixture: ComponentFixture<AdminEditMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEditMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEditMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
