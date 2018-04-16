import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderFilesComponent } from './admin-order-files.component';

describe('AdminOrderFilesComponent', () => {
  let component: AdminOrderFilesComponent;
  let fixture: ComponentFixture<AdminOrderFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminOrderFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrderFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
