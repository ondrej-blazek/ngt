import { Directive, Input } from '@angular/core';
import * as OrbitControls from 'three-orbitcontrols';

@Directive({
  selector: 'ngt-orbit'
})
export class OrbitDirective {
  // element parameters
  @Input() enabled: boolean = true;
  
  private parentID: string;
  public controls: OrbitControls;

  constructor() {
    this.parentID = '';
  }

  setupControls(camera, renderer) {
    this.controls = new OrbitControls(camera, renderer.domElement);
    this.controls.enabled = this.enabled;
  }

  updateControls(scene, camera) {
    this.controls.update();
  }

  renderID(passDown: string): void {
    this.parentID = passDown;
  }
}


// More info:
// https://github.com/nicolaspanel/three-orbitcontrols-ts#readme
// https://threejs.org/docs/#examples/controls/OrbitControls

// newer but not working:  https://www.npmjs.com/package/three-orbitcontrols
