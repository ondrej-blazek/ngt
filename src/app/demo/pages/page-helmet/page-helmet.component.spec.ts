import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageHelmetComponent } from './page-helmet.component';

describe('PageHelmetComponent', () => {
  let component: PageHelmetComponent;
  let fixture: ComponentFixture<PageHelmetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageHelmetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageHelmetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
