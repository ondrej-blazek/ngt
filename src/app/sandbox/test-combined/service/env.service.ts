import * as THREE from 'three';

export class EnvService {
  public camPosition: THREE.Vector3;
  public isVRMode: boolean;
  public backgroundColor: THREE.Color;

  public lightPosition: THREE.Vector3;
  public hemPosition: THREE.Vector3;

  constructor() {
    this.camPosition = new THREE.Vector3(50, 75, 100);
    this.isVRMode = false;
    this.backgroundColor = new THREE.Color(0xffffff);

    this.lightPosition = new THREE.Vector3(-30, 75, 15);
    this.hemPosition = new THREE.Vector3(0, 1, 0);
  }
}
