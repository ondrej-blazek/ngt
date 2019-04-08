import { Directive, Input } from '@angular/core';
import * as THREE from 'three';

@Directive({
  selector: 'ngt-box'
})
export class BoxDirective {
  // element parameters
  @Input() location: number[] = [0, 0, 0];    // THREE.Vector3
  @Input() rotation: number[] = [0, 0, 0];    // THREE.Euler

  public geometry: THREE.BoxBufferGeometry;
  public material: THREE.MeshPhongMaterial;
  public box: THREE.Mesh;

  constructor() {
    this.geometry = new THREE.BoxBufferGeometry( 10, 10, 10 );
    this.material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      specular: 0x050505,
      shininess: 20,
      morphTargets: true,
      flatShading: true
    });

    this.box = new THREE.Mesh( this.geometry, this.material );
    this.box.castShadow = true;
    this.box.receiveShadow = true;
  }

  ngOnInit() {
    this.box.position.set(this.location[0], this.location[1], this.location[2]);
    this.box.rotation.set(THREE.Math.degToRad (this.rotation[0]), THREE.Math.degToRad (this.rotation[1]), THREE.Math.degToRad (this.rotation[2]), 'XYZ');
  }

  animate ():void {
    // requestAnimationFrame(() => this.animate());
    this.box.rotation.y += 0.01;
  }


  setLocation (location:number[]):void {
    this.box.position.set(location[0], location[1], location[2]);
  }

  setRotation (rotation:number[]):void {
    this.box.rotation.set(THREE.Math.degToRad (rotation[0]), THREE.Math.degToRad (rotation[1]), THREE.Math.degToRad (rotation[2]), 'XYZ');
  }

  render(): void {
    this.animate ();
  }
}
