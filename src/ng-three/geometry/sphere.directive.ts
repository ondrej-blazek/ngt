import { Directive, Input } from '@angular/core';
import * as THREE from 'three';

@Directive({
  selector: 'ngt-sphere'
})
export class SphereDirective {
  // element parameters
  @Input() id: number = 0;
  @Input() uuid: string = '';
  @Input() location: number[] = [0, 0, 0];    // THREE.Vector3
  @Input() rotation: number[] = [0, 0, 0];    // THREE.Euler
  @Input() scale: number[] = [0, 0, 0];       // THREE.Vector3

  private geometry: THREE.SphereGeometry;
  private material: THREE.MeshPhongMaterial;
  public sphere: THREE.Mesh;
  public degrees: number = THREE.Math.randInt(0,180);

  constructor() {
    let geometry = new THREE.SphereGeometry(5, 10, 10);
    let material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      specular: 0x050505,
      shininess: 20,
      morphTargets: true,
      flatShading: true
    });
    let sphere = new THREE.Mesh(geometry, material);

    this.sphere = sphere;
    this.sphere.castShadow = true;
    this.sphere.receiveShadow = true;

    this.animate ();
  }

  ngOnInit() {
    this.sphere.position.set(this.location[0], this.location[1], this.location[2]);
    this.sphere.rotation.set(THREE.Math.degToRad (this.rotation[0]), THREE.Math.degToRad (this.rotation[1]), THREE.Math.degToRad (this.rotation[2]), 'XYZ');
  }

  animate ():void {
    requestAnimationFrame(() => this.animate());

    this.degrees ++;
    if (this.degrees === 360) {
      this.degrees = 0;
    }

    let localRadians:number = THREE.Math.degToRad (this.degrees);
    this.sphere.position.y = (Math.sin(localRadians) * 15) + 20;
  }

  
  setLocation (location:number[]):void {
    this.sphere.position.set(location[0], location[1], location[2]);
  }

  setRotation (rotation:number[]):void {
    this.sphere.rotation.set(THREE.Math.degToRad (rotation[0]), THREE.Math.degToRad (rotation[1]), THREE.Math.degToRad (rotation[2]), 'XYZ');
  }

  setDegrees (degrees:number):void {
    this.degrees = degrees;
  }
}
