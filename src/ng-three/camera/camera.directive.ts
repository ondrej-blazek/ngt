import { Directive, Input } from '@angular/core';
import * as THREE from 'three';

@Directive({
  selector: 'ngt-camera'
})
export class CameraDirective {
  // element parameters 
  @Input() height: number;
  @Input() width: number;
  @Input() location: number[] = [0, 0, 0];    // THREE.Vector3
  @Input() rotation: number[] = [0, 0, 0];    // THREE.Euler

  private viewAngle: number = 75;
  private aspect: number;
  private near: number = 0.1;
  private far: number = 10000;
  
  public camera: THREE.PerspectiveCamera;

  constructor() {
    this.aspect = this.width / this.height;
    this.camera = new THREE.PerspectiveCamera(this.viewAngle, this.aspect, this.near, this.far);
  }

  ngOnInit() {
    this.setPosition (this.location, this.rotation);
  }

  ngOnChanges(changes) {
    const widthChng = changes.width && changes.width.currentValue;
    const heightChng = changes.height && changes.height.currentValue;
    if(widthChng || heightChng) {
      this.updateAspect(this.width / this.height);
    }

    if((changes.location && changes.location.currentValue) || (changes.rotation && changes.rotation.currentValue)) {
      this.setPosition(this.location, this.rotation);
    }
  }

  updateAspect(ratio) {
    if(this.camera) {
      this.camera.aspect = ratio;
      this.camera.updateProjectionMatrix();
    }
  }

  setPosition(location, rotation) {
    this.camera.position.set(location[0], location[1], location[2]);
    this.camera.rotation.set(THREE.Math.degToRad (rotation[0]), THREE.Math.degToRad (rotation[1]), THREE.Math.degToRad (rotation[2]), 'XYZ');
  }
}
