// This class contains all functions that are required by ObjectDirective
import * as THREE from 'three';

export abstract class ObjectService {
  private location: THREE.Vector3;
  private position: THREE.Vector3;
  private offset: THREE.Vector3;
  private rotation: THREE.Euler;
  private scale: THREE.Vector3;

  protected defaultColor: THREE.Color;
  protected highlightColor: THREE.Color;
  protected clickedColor: THREE.Color;
  protected clickedHighlightColor: THREE.Color;

  public object: any;   // THREE.Mesh;

  constructor() {
    this.location = new THREE.Vector3(0, 0, 0);
    this.position = new THREE.Vector3(0, 0, 0);
    this.offset = new THREE.Vector3(0, 0, 0);
    this.rotation = new THREE.Euler(0, 0, 0, 'XYZ');
    this.scale = new THREE.Vector3(1, 1, 1);

    this.defaultColor = new THREE.Color(0xffffff);
    this.highlightColor = new THREE.Color(0xff000);
    this.clickedColor = new THREE.Color(0x0000ff);
    this.clickedHighlightColor = new THREE.Color(0xff00ff);
  }

  // Object transformation
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

  // User interaction
  userSetActiveObject(): void {
    if (this.object.material.color === this.clickedColor || this.object.material.color === this.clickedHighlightColor) {
      this.object.material.color = this.clickedHighlightColor;
    } else {
      this.object.material.color = this.highlightColor;
    }
  }

  userClearActiveObject(): void {
    if (this.object.material.color === this.clickedColor || this.object.material.color === this.clickedHighlightColor) {
      this.object.material.color = this.clickedColor;
    } else {
      this.object.material.color = this.defaultColor;
    }
  }

  userSetClickedObject(): void {
    this.object.material.color = this.clickedColor;
  }

  userClearClickedObject(): void {
    this.object.material.color = this.defaultColor;
  }

  // Render every frame
  render (): void {}
}
