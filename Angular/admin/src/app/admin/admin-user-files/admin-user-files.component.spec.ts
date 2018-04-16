import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserFilesComponent } from './admin-user-files.component';

describe('AdminUserFilesComponent', () => {
  let component: AdminUserFilesComponent;
  let fixture: ComponentFixture<AdminUserFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUserFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
