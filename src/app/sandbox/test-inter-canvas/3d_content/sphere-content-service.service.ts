import * as THREE from 'three';
import { ObjectService } from '@ngt/service';

export class SphereContentServiceService extends ObjectService {
  private degrees: number;

  public geometry: THREE.BoxBufferGeometry;
  public material: THREE.MeshPhongMaterial;

  constructor () {
    super();

    this.degrees = THREE.Math.randInt(0, 180);

    this.defaultColor = new THREE.Color(0xffffff);
    this.highlightColor = new THREE.Color(0xE5AD44);
    this.clickedColor = new THREE.Color(0x870D6B);
    this.clickedHighlightColor = new THREE.Color(0xEA52C7);

    const geometry = new THREE.SphereGeometry(5, 10, 10);
    const material = new THREE.MeshPhongMaterial({
      color: this.defaultColor,
      specular: 0x050505,
      shininess: 20,
      morphTargets: true,
      flatShading: true
    });
    const sphere = new THREE.Mesh(geometry, material);

    this.object = sphere;
    this.object.castShadow = true;
    this.object.receiveShadow = true;
  }

  setDegrees (degrees: number): void {
    this.degrees = degrees;
  }

  render (): void {
    this.degrees ++;
    if (this.degrees === 360) {
      this.degrees = 0;
    }

    const localRadians: number = THREE.Math.degToRad (this.degrees);
    this.object.position.y = (Math.sin(localRadians) * 15) + 20;
  }
}
