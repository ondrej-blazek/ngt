import { Directive, Input, OnInit, OnChanges, AfterContentInit } from '@angular/core';
import * as THREE from 'three';

@Directive({
  selector: 'ngt-helper-grid'     // tslint:disable-line
})
export class GridDirective implements OnInit, OnChanges, AfterContentInit {
  @Input() size: number;
  @Input() divisions: number;
  @Input() visible: boolean;

  public gridHelper: THREE.GridHelper;

  constructor () {
    this.size = 100;
    this.divisions = 10;
    this.visible = true;
  }

  ngOnChanges (changes) {
    if (changes.size) {
      this.size = changes.size.currentValue;
    }

    if (changes.divisions) {
      this.divisions = changes.divisions.currentValue;
    }

    if (changes.visible) {
      this.visible = changes.visible.currentValue;
      this.gridHelper.visible = this.visible;
    }
  }

  ngOnInit () {
    this.gridHelper = new THREE.GridHelper(this.size, this.divisions);
    this.gridHelper.visible = this.visible;
  }
  ngAfterContentInit () {}
}
