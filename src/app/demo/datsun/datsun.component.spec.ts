import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatsunComponent } from './datsun.component';

describe('DatsunComponent', () => {
  let component: DatsunComponent;
  let fixture: ComponentFixture<DatsunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatsunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatsunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
