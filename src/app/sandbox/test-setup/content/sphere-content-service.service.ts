import * as THREE from 'three';

// TODO - common content class that contains common transorm functions like set rotation or position
// https://www.typescriptlang.org/docs/handbook/classes.html

export class SphereContentServiceService {
  private location: number[];    // THREE.Vector3
  private rotation: number[];    // THREE.Euler
  private scale: number[];       // THREE.Vector3
  private degrees: number;

  public geometry: THREE.BoxBufferGeometry;
  public material: THREE.MeshPhongMaterial;
  public object: THREE.Mesh;

  constructor() {
    this.location = [0, 0, 0];
    this.rotation = [0, 0, 0];
    this.scale = [0, 0, 0];
    this.degrees = THREE.Math.randInt(0,180);

    let geometry = new THREE.SphereGeometry(5, 10, 10);
    let material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      specular: 0x050505,
      shininess: 20,
      morphTargets: true,
      flatShading: true
    });
    let sphere = new THREE.Mesh(geometry, material);

    this.object = sphere;
    this.object.castShadow = true;
    this.object.receiveShadow = true;
  }

  setLocation (location:number[]):void {
    this.location = location;
    this.object.position.set(location[0], location[1], location[2]);
  }

  setRotation (rotation:number[]):void {
    this.rotation = rotation;
    this.object.rotation.set(THREE.Math.degToRad (rotation[0]), THREE.Math.degToRad (rotation[1]), THREE.Math.degToRad (rotation[2]), 'XYZ');
  }

  render(): void {
    this.degrees ++;
    if (this.degrees === 360) {
      this.degrees = 0;
    }

    let localRadians:number = THREE.Math.degToRad (this.degrees);
    this.object.position.y = (Math.sin(localRadians) * 15) + 20;
  }
}
