import { Directive } from '@angular/core';
import * as THREE from 'three';

@Directive({
  selector: 'kzri-ground'
})
export class GroundDirective {

  public geometry: THREE.PlaneBufferGeometry;
  public material: THREE.MeshPhongMaterial;
  public plane: THREE.Mesh;

  constructor() { }

  ngAfterContentInit() {
    this.geometry = new THREE.PlaneBufferGeometry ( 10000, 10000 );
    this.material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      specular: 0x050505,
      side: THREE.DoubleSide
    });
    this.material.color.setHSL( 0.095, 1, 0.75 );

    this.plane = new THREE.Mesh( this.geometry, this.material );
    this.plane.rotation.x = - Math.PI / 2;
    this.plane.receiveShadow = true;

  }
}
