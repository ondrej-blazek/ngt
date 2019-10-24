import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDancerComponent } from './page-dancer.component';

describe('PageDancerComponent', () => {
  let component: PageDancerComponent;
  let fixture: ComponentFixture<PageDancerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageDancerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageDancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
