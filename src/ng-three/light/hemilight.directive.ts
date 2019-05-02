import { Directive, Input, OnInit, OnChanges, AfterContentInit, OnDestroy } from '@angular/core';
import * as THREE from 'three';

@Directive({
  selector: 'ngt-hemisphere-light'     // tslint:disable-line
})
export class HemisphereLightDirective implements OnInit, OnChanges, AfterContentInit, OnDestroy {
  // element parameters
  @Input() offset: THREE.Vector3;
  @Input() animate: boolean;
  @Input() content: any;

  public parentID: string;
  public light: THREE.HemisphereLight;
  public lightHelper: THREE.HemisphereLightHelper;

  constructor () {
    this.offset = new THREE.Vector3(0, 0, 0);
    this.animate = false;
    this.content = null;
    this.parentID = '';

    // Light + helper object
    this.light = new THREE.HemisphereLight();
    this.lightHelper = new THREE.HemisphereLightHelper( this.light, 20 );
  }

  ngOnChanges (changes) {
    if (changes.offset && changes.offset.currentValue) {
      this.content.setOffset (this.light, changes.offset.currentValue);
    }
    if (changes.animate && changes.animate.currentValue) {
      this.animate = changes.animate.currentValue;
    }
  }

  ngOnInit () {
    this.light = this.content.setLight(this.light);
    this.lightHelper.update();
  }

  ngAfterContentInit (): void {}
  ngOnDestroy (): void {
    this.lightHelper.dispose();
  }

  renderID (passDown: string): void {
    this.parentID = passDown;
  }

  render (): void {
    if (this.content && this.animate) {
      this.light = this.content.render(this.light);
    }
  }
}

// More reading:
//   https://threejs.org/docs/#api/en/lights/HemisphereLight
//   https://threejs.org/docs/#api/en/helpers/HemisphereLightHelper
