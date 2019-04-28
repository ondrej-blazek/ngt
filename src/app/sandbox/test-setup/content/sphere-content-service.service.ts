import * as THREE from 'three';

// https://www.typescriptlang.org/docs/handbook/classes.html

export class SphereContentServiceService {
  private location: THREE.Vector3;
  private position: THREE.Vector3;
  private offset: THREE.Vector3;
  private rotation: THREE.Euler;
  private scale: THREE.Vector3;
  private degrees: number;

  public geometry: THREE.BoxBufferGeometry;
  public material: THREE.MeshPhongMaterial;
  public object: any;

  constructor() {
    this.location = new THREE.Vector3(0, 0, 0);
    this.position = new THREE.Vector3(0, 0, 0);
    this.offset = new THREE.Vector3(0, 0, 0);
    this.rotation = new THREE.Euler(0, 0, 0, 'XYZ');
    this.scale = new THREE.Vector3(1, 1, 1);
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

  setPosition (offset:THREE.Vector3):void {
    this.offset = offset;
    this.position = this.location.add(this.offset);
    this.object.position.set(this.position.x, this.position.y, this.position.z);
  }

  setRotation (rotation:THREE.Euler):void {
    this.rotation = rotation;
    this.object.rotation.set(rotation.x, rotation.y, rotation.z, rotation.order);
  }

  setScale (scale:THREE.Vector3):void {
    this.scale = scale;
    this.object.scale.set(this.scale.x, this.scale.y, this.scale.z);
  }

  setDegrees (degrees:number):void {
    this.degrees = degrees;
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
