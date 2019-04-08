// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })

import * as THREE from 'three';

export class CubeContentServiceService {
  private location: number[];    // THREE.Vector3
  private rotation: number[];    // THREE.Euler

  public geometry: THREE.BoxBufferGeometry;
  public material: THREE.MeshPhongMaterial;
  public object: THREE.Mesh;

  constructor() {
    this.location = [0, 0, 0];
    this.rotation = [0, 0, 0];

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

  setLocation (location:number[]):void {
    this.location = location;
    this.object.position.set(location[0], location[1], location[2]);
  }

  setRotation (rotation:number[]):void {
    this.rotation = rotation;
    this.object.rotation.set(THREE.Math.degToRad (rotation[0]), THREE.Math.degToRad (rotation[1]), THREE.Math.degToRad (rotation[2]), 'XYZ');
  }

  render(): void {
    // console.log('CubeContentServiceService - render');
    this.object.rotation.y += 0.01;
  }
}
