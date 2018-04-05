import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiamondDashboardComponent } from './diamond-dashboard.component';

describe('DiamondDashboardComponent', () => {
  let component: DiamondDashboardComponent;
  let fixture: ComponentFixture<DiamondDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiamondDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiamondDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
