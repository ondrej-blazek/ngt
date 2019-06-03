import { Directive, Input } from '@angular/core';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Directive({
  selector: 'ngt-orbit'     // tslint:disable-line
})
export class OrbitDirective {
  @Input() enabled: boolean;

  private chronosID: string;
  private renderID: string;
  public controls: OrbitControls;

  constructor () {
    this.chronosID = '';
    this.renderID = '';
    this.enabled = true;
  }

  setupControls (camera, renderer): void {
    this.controls = new OrbitControls(camera, renderer.domElement);
    this.controls.enabled = this.enabled;
    // this.controls.minDistance = 0;
    // this.controls.maxDistance = 5;
    // this.controls.minPolarAngle = Math.PI * 0;
    // this.controls.maxPolarAngle = Math.PI * 0.495;
  }

  updateControls (scene, camera): void {
    this.controls.update();
  }

  processID (chronosID: string, renderID: string): void {
    this.chronosID = chronosID;
    this.renderID = renderID;
  }
}
