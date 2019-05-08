import * as THREE from 'three';

// https://www.typescriptlang.org/docs/handbook/classes.html

export class CubeContentServiceService {
  private location: THREE.Vector3;
  private position: THREE.Vector3;
  private offset: THREE.Vector3;
  private rotation: THREE.Euler;
  private scale: THREE.Vector3;

  public geometry: THREE.BoxBufferGeometry;
  public material: THREE.MeshPhongMaterial;
  public object: any;   // THREE.Mesh;

  constructor () {
    this.location = new THREE.Vector3(0, 0, 0);
    this.position = new THREE.Vector3(0, 0, 0);
    this.offset = new THREE.Vector3(0, 0, 0);
    this.rotation = new THREE.Euler(0, 0, 0, 'XYZ');
    this.scale = new THREE.Vector3(1, 1, 1);

    this.geometry = new THREE.BoxBufferGeometry( 10, 10, 10 );
    this.material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      specular: 0x050505,
      shininess: 20,
      morphTargets: true,
      flatShading: true
    });

    this.object = new THREE.Mesh( this.geometry, this.material );
    this.object.castShadow = true;
    this.object.receiveShadow = true;
  }

  setPosition (offset: THREE.Vector3): void {
    this.offset = offset;
    this.position = this.location.add(this.offset);
    this.object.position.set(this.position.x, this.position.y, this.position.z);
  }

  setRotation (rotation: THREE.Euler): void {
    this.rotation = rotation;
    this.object.rotation.set(rotation.x, rotation.y, rotation.z, rotation.order);
  }

  setScale (scale: THREE.Vector3): void {
    this.scale = scale;
    this.object.scale.set(this.scale.x, this.scale.y, this.scale.z);
  }

  render (): void {
    this.object.rotation.y += 0.01;
  }

  // User interaction
  userSetActiveObject(): void {
    if (!this.object.currentHex || this.object.currentHex === null) {
      this.object.currentHex = this.object.material.color.getHex();
    }
    this.object.material.color.setHex(0x0000ff);
  }

  userClearActiveObject(): void {
    this.object.material.color.setHex(this.object.currentHex);
    this.object.currentHex = null;
  }

  userSetClickedObject(): void {
    console.log('CubeContentServiceService - setClickedObject');
  }

  userClearClickedObject(): void {
    console.log('CubeContentServiceService - clearClickedObject');
  }
}
