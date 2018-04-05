import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhenAuthorSelectedComponent } from './when-author-selected.component';

describe('WhenAuthorSelectedComponent', () => {
  let component: WhenAuthorSelectedComponent;
  let fixture: ComponentFixture<WhenAuthorSelectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhenAuthorSelectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhenAuthorSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
