import { Directive, Input } from '@angular/core';

import { OrbitControls } from 'three-orbitcontrols-ts';

@Directive({
  selector: 'ngt-orbit'
})
export class OrbitDirective {
  // element parameters
  @Input() enabled: boolean = true;
  
  public controls: OrbitControls;

  constructor() { }

  setupControls(camera, renderer) {
    this.controls = new OrbitControls(camera, renderer.domElement);
    this.controls.enabled = this.enabled;
  }

  updateControls(scene, camera) {
    this.controls.update();
  }
}


// More info:
// https://github.com/nicolaspanel/three-orbitcontrols-ts#readme
// https://threejs.org/docs/#examples/controls/OrbitControls
