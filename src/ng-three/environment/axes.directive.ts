import { Directive, Input, OnInit, OnChanges, AfterContentInit } from '@angular/core';
import * as THREE from 'three';

@Directive({
  selector: 'ngt-helper-axes'
})
export class AxesDirective implements OnInit, OnChanges, AfterContentInit {
  @Input() side: number;
  @Input() visible: boolean;

  public axesHelper: THREE.AxesHelper;

  constructor() {
    this.side = 100;
    this.visible = true;
  }

  ngOnChanges(changes) {
    if(changes.side) {
      this.side = changes.side.currentValue;
    }
  }

  ngOnInit () {
    this.axesHelper = new THREE.AxesHelper(this.side);
    this.axesHelper.visible = this.visible;
  }

  ngAfterContentInit() {}
}
