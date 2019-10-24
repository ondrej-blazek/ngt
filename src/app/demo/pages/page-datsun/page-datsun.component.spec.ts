import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDatsunComponent } from './page-datsun.component';

describe('PageDatsunComponent', () => {
  let component: PageDatsunComponent;
  let fixture: ComponentFixture<PageDatsunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageDatsunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageDatsunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
