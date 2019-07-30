import * as THREE from 'three';

export class CubeService {
  public cubeAOffset: THREE.Vector3;
  public cubeARotation: THREE.Euler;
  public cubeAScale: THREE.Vector3;

  public cubeBOffset: THREE.Vector3;
  public cubeBRotation: THREE.Euler;
  public cubeBScale: THREE.Vector3;

  constructor() {
    this.cubeAOffset = new THREE.Vector3(0, 10, 0);
    this.cubeARotation = new THREE.Euler(0, 0, THREE.Math.degToRad(30), 'XYZ');
    this.cubeAScale = new THREE.Vector3(0.5, 2, 1);

    this.cubeBOffset = new THREE.Vector3(-12, 10, 0);
    this.cubeBRotation = new THREE.Euler(0, THREE.Math.degToRad(45), THREE.Math.degToRad(30), 'XYZ');
    this.cubeBScale = new THREE.Vector3(1, 0.5, 1);
  }
}
