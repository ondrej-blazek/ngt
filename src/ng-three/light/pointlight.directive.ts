import { Directive, Input } from '@angular/core';
import * as THREE from 'three';

@Directive({
  selector: 'ngt-pointlight'
})
export class PointLightDirective {
  // element parameters
  @Input() color: string = '#FFFF00';
  @Input() location: number[] = [0, 0, 0];    // THREE.Vector3

  private parentID: string;
  public light: THREE.PointLight;

  constructor() {
    this.parentID = '';

    this.light = new THREE.PointLight( 0xffffff, 1.5, 200, 2 );
    this.light.castShadow = true;

    this.light.shadow.mapSize.width = 2048;
    this.light.shadow.mapSize.height = 2048;
    this.light.shadow.camera.far = 3500;
    this.light.shadow.bias = -0.0001;
  }

  ngOnInit() {
    this.setPosition(this.location);
  }

  ngOnChanges(changes) {
    if(changes.position && changes.position.currentValue) {
      this.setPosition(this.location);
    }
  }

  renderID(passDown: string): void {
    this.parentID = passDown;
  }

  setPosition(position) {
    this.light.position.set(position[0], position[1], position[2]);
  }
}
