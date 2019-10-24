import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageInterCanvasComponent } from './page-inter-canvas.component';

describe('PageInterCanvasComponent', () => {
  let component: PageInterCanvasComponent;
  let fixture: ComponentFixture<PageInterCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageInterCanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageInterCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
