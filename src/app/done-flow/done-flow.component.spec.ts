import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoneFlowComponent } from './done-flow.component';

describe('DoneFlowComponent', () => {
  let component: DoneFlowComponent;
  let fixture: ComponentFixture<DoneFlowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoneFlowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoneFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
