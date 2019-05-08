import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestCombinedComponent } from './test-combined.component';

describe('TestCombinedComponent', () => {
  let component: TestCombinedComponent;
  let fixture: ComponentFixture<TestCombinedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestCombinedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCombinedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
