import * as THREE from 'three';

export class EnvService {
  public camPosition: THREE.Vector3;
  public isVRMode: boolean;
  public backgroundColor: THREE.Color;
  public fogColor: THREE.Color;

  public groundColor: THREE.Color;
  public groundSpecular: THREE.Color;

  public lightPosition: THREE.Vector3;
  public hemPosition: THREE.Vector3;

  constructor() {
    this.isVRMode = false;
    this.camPosition = new THREE.Vector3(50, 75, 100);

    this.backgroundColor = new THREE.Color(0xD7CBB1);
    this.fogColor = new THREE.Color(0xD2C6AC);

    this.groundColor = new THREE.Color(0xD7CBB1);
    this.groundSpecular = new THREE.Color(0x333333);

    this.lightPosition = new THREE.Vector3(-30, 75, 15);
    this.hemPosition = new THREE.Vector3(0, 1, 0);
  }
}
