import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainFlowComponent } from './main-flow.component';

describe('MainFlowComponent', () => {
  let component: MainFlowComponent;
  let fixture: ComponentFixture<MainFlowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainFlowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
