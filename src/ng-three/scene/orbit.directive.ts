import { Directive, Input } from '@angular/core';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Directive({
  selector: 'ngt-orbit'     // tslint:disable-line
})
export class OrbitDirective {
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
