import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BecomeAnAuthorComponent } from './become-an-author.component';

describe('BecomeAnAuthorComponent', () => {
  let component: BecomeAnAuthorComponent;
  let fixture: ComponentFixture<BecomeAnAuthorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BecomeAnAuthorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BecomeAnAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
