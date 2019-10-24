import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageCthulhuComponent } from './page-cthulhu.component';

describe('PageCthulhuComponent', () => {
  let component: PageCthulhuComponent;
  let fixture: ComponentFixture<PageCthulhuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageCthulhuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageCthulhuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
