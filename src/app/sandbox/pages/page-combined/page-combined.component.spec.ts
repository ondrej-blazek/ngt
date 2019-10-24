import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCombinedComponent } from './page-combined.component';

describe('PageCombinedComponent', () => {
  let component: PageCombinedComponent;
  let fixture: ComponentFixture<PageCombinedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageCombinedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageCombinedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
