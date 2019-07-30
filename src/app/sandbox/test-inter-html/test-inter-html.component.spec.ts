import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestInnerHTMLComponent } from './test-inter-html.component';

describe('TestInnerHTMLComponent', () => {
  let component: TestInnerHTMLComponent;
  let fixture: ComponentFixture<TestInnerHTMLComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestInnerHTMLComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestInnerHTMLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
