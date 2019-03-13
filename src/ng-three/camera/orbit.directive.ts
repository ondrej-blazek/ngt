import { Directive, Input } from '@angular/core';

import * as THREE from 'three';
import 'three/examples/js/controls/OrbitControls.js';

@Directive({
  selector: 'ngt-orbit'
})
export class OrbitDirective {
  // element parameters
  @Input() enabled: boolean = true;
  
  public controls: THREE.OrbitControls;

  constructor() { }

  setupControls(camera, renderer) {
    this.controls = new THREE.OrbitControls(camera, renderer.domElement);
    this.controls.enabled = this.enabled;
  }

  updateControls(scene, camera) {
    this.controls.update();
  }
}
