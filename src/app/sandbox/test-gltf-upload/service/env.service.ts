import * as THREE from 'three';

export class EnvService {
  public camPosition: THREE.Vector3;
  public backgroundColor: THREE.Color;
  public fogColor: THREE.Color;

  public orbitControls: any;

  public groundColor: THREE.Color;
  public groundSpecular: THREE.Color;

  public lightPosition: THREE.Vector3;
  public hemPosition: THREE.Vector3;

  constructor() {
    this.camPosition = new THREE.Vector3(20, 10, 40);

    this.backgroundColor = new THREE.Color(0xD7CBB1);
    this.fogColor = new THREE.Color(0xD2C6AC);

    this.orbitControls = {
      minDistance: 10,
      maxDistance: 60,
      minPolarAngle: Math.PI * 0,
      maxPolarAngle: Math.PI * 0.45,
      enablePan: false,
      keys: {
        LEFT: 37,   // left arrow
        UP: 38,     // up arrow
        RIGHT: 39,  // right arrow
        BOTTOM: 40  // down arrow
      }
    };

    this.groundColor = new THREE.Color(0xD7CBB1);
    this.groundSpecular = new THREE.Color(0x333333);

    this.lightPosition = new THREE.Vector3(-30, 75, 15);
    this.hemPosition = new THREE.Vector3(0, 1, 0);
  }
}
