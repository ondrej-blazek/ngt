import * as THREE from 'three';
import { ObjectService } from '@ngt/service';

export class CubeContentServiceService extends ObjectService {
  public geometry: THREE.BoxBufferGeometry;
  public material: THREE.MeshPhongMaterial;

  constructor () {
    super();

    this.defaultColor = new THREE.Color(0xffffff);
    this.highlightColor = new THREE.Color(0xE43009);
    this.clickedColor = new THREE.Color(0x0B4CB7);
    this.clickedHighlightColor = new THREE.Color(0x449EE5);

    this.geometry = new THREE.BoxBufferGeometry( 10, 10, 10 );
    this.material = new THREE.MeshPhongMaterial({
      color: this.defaultColor,
      specular: 0x050505,
      shininess: 20,
      morphTargets: true,
      flatShading: true
    });

    this.object = new THREE.Mesh( this.geometry, this.material );
    this.object.castShadow = true;
    this.object.receiveShadow = true;
  }

  render (): void {
    this.object.rotation.y += 0.01;
  }
}
