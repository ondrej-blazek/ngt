import { Directive, Input } from '@angular/core';
import * as OrbitControls from 'three-orbitcontrols';

@Directive({
  selector: 'ngt-orbit'     // tslint:disable-line
})
export class OrbitDirective {
  // element parameters
  @Input() enabled: boolean;

  private parentID: string;
  public controls: OrbitControls;

  constructor () {
    this.parentID = '';
    this.enabled = true;
  }

  setupControls (camera, renderer): void {
    this.controls = new OrbitControls(camera, renderer.domElement);
    this.controls.enabled = this.enabled;
  }

  updateControls (scene, camera): void {
    this.controls.update();
  }

  renderID (passDown: string): void {
    this.parentID = passDown;
  }
}

// More info:
// https://github.com/nicolaspanel/three-orbitcontrols-ts#readme
// https://threejs.org/docs/#examples/controls/OrbitControls

// newer but not working:  https://www.npmjs.com/package/three-orbitcontrols
