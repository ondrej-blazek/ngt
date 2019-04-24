import { Directive, AfterContentInit, OnInit } from '@angular/core';
import * as THREE from 'three';

// TODO - Make this partially adjustable from content class Colour / Size
// TODO - create default class in cas that content / partial setting is not provided.  ???

@Directive({
  selector: 'ngt-ground'
})
export class GroundDirective implements OnInit, AfterContentInit {

  public geometry: THREE.PlaneBufferGeometry;
  public material: THREE.MeshPhongMaterial;
  public plane: THREE.Mesh;

  constructor() {
    this.geometry = new THREE.PlaneBufferGeometry ( 100, 100 );  // 10000
    this.material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      specular: 0x050505,
      side: THREE.DoubleSide
    });

    this.plane = new THREE.Mesh( this.geometry, this.material );
    this.plane.name = 'ground';
    this.plane.rotation.x = - Math.PI / 2;
    this.plane.receiveShadow = true;
  }
  
  ngOnInit () {}
  ngAfterContentInit() {}
}
