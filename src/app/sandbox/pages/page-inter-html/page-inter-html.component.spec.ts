import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageInterHtmlComponent } from './page-inter-html.component';

describe('PageInterHtmlComponent', () => {
  let component: PageInterHtmlComponent;
  let fixture: ComponentFixture<PageInterHtmlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageInterHtmlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageInterHtmlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
