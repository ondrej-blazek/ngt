import * as THREE from 'three';

export class SphereService {
  public sphereAOffset: THREE.Vector3;
  public sphereARotation: THREE.Euler;
  public sphereAScale: THREE.Vector3;

  public sphereBOffset: THREE.Vector3;
  public sphereBRotation: THREE.Euler;
  public sphereBScale: THREE.Vector3;

  constructor() {
    this.sphereAOffset = new THREE.Vector3(11, 10, 0);
    this.sphereARotation = new THREE.Euler(0, 0, 0, 'XYZ');
    this.sphereAScale = new THREE.Vector3(1, 1, 1);

    this.sphereBOffset = new THREE.Vector3(0, 10, -10);
    this.sphereBRotation = new THREE.Euler(0, 0, 0, 'XYZ');
    this.sphereBScale = new THREE.Vector3(1, 1, 1);
   }
}
