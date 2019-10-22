import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CthulhuComponent } from './cthulhu.component';

describe('CthulhuComponent', () => {
  let component: CthulhuComponent;
  let fixture: ComponentFixture<CthulhuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CthulhuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CthulhuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
