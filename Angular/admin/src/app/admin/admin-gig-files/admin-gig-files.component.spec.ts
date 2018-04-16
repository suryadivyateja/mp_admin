import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGigFilesComponent } from './admin-gig-files.component';

describe('AdminGigFilesComponent', () => {
  let component: AdminGigFilesComponent;
  let fixture: ComponentFixture<AdminGigFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGigFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGigFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
