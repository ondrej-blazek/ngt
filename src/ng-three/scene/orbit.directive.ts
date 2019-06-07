import { Directive, Input, OnChanges, OnInit } from '@angular/core';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Directive({
  selector: 'ngt-orbit'     // tslint:disable-line
})
export class OrbitDirective implements OnChanges, OnInit {
  @Input() enabled: boolean;
  @Input() controls: any;

  private chronosID: string;
  private renderID: string;
  public orbitControls: OrbitControls;

  constructor () {
    this.chronosID = '';
    this.renderID = '';
    this.enabled = true;
  }

  ngOnChanges (changes) {
    if (changes.enabled && changes.enabled.currentValue && this.orbitControls) {
      this.enabled = changes.enabled.currentValue;
      this.orbitControls.enabled = this.enabled;
    }
  }
  ngOnInit () {}

  // ---------------------------------------------------------------------------------

  setupControls (camera, renderer): void {
    this.orbitControls = new OrbitControls(camera, renderer.domElement);
    this.orbitControls.enabled = this.enabled;

    if (this.controls) {
      Object.keys(this.controls).forEach(key => {
        this.orbitControls[key] = this.controls[key];
      });
    }
  }

  updateControls (scene, camera): void {
    this.orbitControls.update();
  }

  processID (chronosID: string, renderID: string): void {
    this.chronosID = chronosID;
    this.renderID = renderID;
  }
}


// More reading:
//    https://threejs.org/docs/#examples/controls/OrbitControls
