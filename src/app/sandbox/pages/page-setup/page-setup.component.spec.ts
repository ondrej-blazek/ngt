import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSetupComponent } from './page-setup.component';

describe('PageSetupComponent', () => {
  let component: PageSetupComponent;
  let fixture: ComponentFixture<PageSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
