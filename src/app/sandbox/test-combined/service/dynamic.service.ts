import * as THREE from 'three';

export class DynamicService {
  public dynamicOffset: THREE.Vector3;
  public dynamicRotation: THREE.Euler;
  public dynamicScale: THREE.Vector3;
  public dynamicAnimate: boolean;

  constructor() {
    this.dynamicOffset = new THREE.Vector3(0, 0, 0);
    this.dynamicRotation = new THREE.Euler(0, THREE.Math.degToRad(-45), THREE.Math.degToRad(45), 'XYZ');
    this.dynamicScale = new THREE.Vector3(2.5, 0.5, 2.5);
    this.dynamicAnimate = true;
  }
}
