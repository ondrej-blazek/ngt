import { Directive, Input, AfterContentInit, OnInit, OnChanges } from '@angular/core';
import * as THREE from 'three';

@Directive({
  selector: 'ngt-ground'     // tslint:disable-line
})
export class GroundDirective implements OnInit, OnChanges, AfterContentInit {
  @Input() color: THREE.Color;
  @Input() specular: THREE.Color;
  @Input() size: number;

  private geometry: THREE.PlaneBufferGeometry;
  private material: THREE.MeshPhongMaterial | THREE.MeshBasicMaterial;
  public plane: THREE.Mesh;

  constructor () {
    this.color = new THREE.Color(0xffffff);
    this.specular = new THREE.Color(0x050505);
    this.size = 10000;

    this.plane = null;
  }

  ngOnChanges (changes) {
    if (changes.color) {
      this.color = changes.color.currentValue;
    }
    if (changes.specular) {
      this.specular = changes.specular.currentValue;
    }
    if (changes.size) {
      this.size = changes.size.currentValue;
    }

    if (changes.color || changes.specular || changes.size) {
      this.setPlane();
    }
  }

  ngOnInit () {
    if (this.plane === null){
      this.setPlane ();
    }
  }
  ngAfterContentInit () {}

  setPlane (): void {
    this.geometry = new THREE.PlaneBufferGeometry ( this.size, this.size );
    this.material = new THREE.MeshPhongMaterial({
      color: this.color,
      specular: this.specular,
      side: THREE.DoubleSide
    });

    this.plane = new THREE.Mesh( this.geometry, this.material );
    this.plane.name = 'ground';
    this.plane.rotation.x = - Math.PI / 2;
    this.plane.receiveShadow = true;
  }
}
