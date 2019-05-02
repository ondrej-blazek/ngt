import { Directive, AfterContentInit, OnInit } from '@angular/core';
import * as THREE from 'three';

// TODO - partially open this directive to be adjustable from a content class colour / fog density or distance
// TODO - create default class in cas that content / partial setting is not provided.  ???

@Directive({
  selector: 'ngt-dome'     // tslint:disable-line
})
export class DomeDirective implements OnInit, AfterContentInit {
  public geometry: THREE.SphereBufferGeometry;
  public material: THREE.ShaderMaterial;
  public dome: THREE.Mesh;

  constructor () {
    const vertexShader =
      'varying vec3 vWorldPosition;' +
      'void main() {' +
      '  vec4 worldPosition = modelMatrix * vec4( position, 1.0 );' +
      '  vWorldPosition = worldPosition.xyz;' +
      '  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );' +
      '}';

    const fragmentShader =
      'uniform vec3 topColor;' +
      'uniform vec3 bottomColor;' +
      'uniform float offset;' +
      'uniform float exponent;' +
      'varying vec3 vWorldPosition;' +
      'void main() {' +
      '  float h = normalize( vWorldPosition + offset ).y;' +
      '  gl_FragColor = vec4( mix( bottomColor, topColor, max( pow( max( h , 0.0), exponent ), 0.0 ) ), 1.0 );' +
      '}';

    const uniforms = {
      topColor:    { value: new THREE.Color( 0x0077ff ) },
      bottomColor: { value: new THREE.Color( 0xffffff ) },
      offset:      { value: 33 },
      exponent:    { value: 0.6 }
    };

    this.geometry = new THREE.SphereBufferGeometry( 4000, 32, 15 );
    this.material = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: uniforms,
      side: THREE.BackSide
    });

    this.dome = new THREE.Mesh( this.geometry, this.material );
    this.dome.name = 'dome';
  }

  ngOnInit () {}
  ngAfterContentInit() {}
}
