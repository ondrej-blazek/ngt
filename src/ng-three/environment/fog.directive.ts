import { Directive, Input, OnInit, OnChanges, AfterContentInit } from '@angular/core';
import * as THREE from 'three';

@Directive({
  selector: 'ngt-fog'     // tslint:disable-line
})
export class FogDirective implements OnInit, OnChanges, AfterContentInit {
  @Input() color: number;
  @Input() near: number;
  @Input() far: number;

  private scene: THREE.Scene;

  constructor () {
    this.color = 0xffffff;
    this.near = 1;
    this.far = 1000;
  }

  ngOnChanges (changes) {
    if (changes.color) {
      this.color = changes.color.currentValue;
    }
    if (changes.near) {
      this.near = changes.near.currentValue;
    }
    if (changes.far) {
      this.far = changes.far.currentValue;
    }

    if (changes.color || changes.near || changes.far) {
      this.updateScene(this.color, this.near, this.far);
    }
  }

  ngOnInit () {
    this.updateScene(this.color, this.near, this.far);
  }
  ngAfterContentInit () {}

  setScene (masterScene: THREE.Scene): void {
    this.scene = masterScene;
  }
  updateScene (color: number, near: number, far: number): void {
    this.scene.fog = new THREE.Fog(color, near, far);
  }
}
