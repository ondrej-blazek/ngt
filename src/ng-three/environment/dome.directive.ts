import { Directive, AfterContentInit } from '@angular/core';
import * as THREE from 'three';

@Directive({
  selector: 'ngt-dome'
})
export class DomeDirective implements AfterContentInit{

  public geometry: THREE.SphereBufferGeometry;
  public material: THREE.ShaderMaterial;
  public dome: THREE.Mesh;

  constructor() { }

  ngAfterContentInit() {
    let vertexShader =
      "varying vec3 vWorldPosition;" +
      "void main() {" +
      "  vec4 worldPosition = modelMatrix * vec4( position, 1.0 );" +
      "  vWorldPosition = worldPosition.xyz;" +
      "  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );" +
      "}";

    let fragmentShader =
      "uniform vec3 topColor;" +
      "uniform vec3 bottomColor;" +
      "uniform float offset;" +
      "uniform float exponent;" +
      "varying vec3 vWorldPosition;" +
      "void main() {" +
      "  float h = normalize( vWorldPosition + offset ).y;" +
      "  gl_FragColor = vec4( mix( bottomColor, topColor, max( pow( max( h , 0.0), exponent ), 0.0 ) ), 1.0 );" +
      "}";

    let uniforms = {
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
  }
}
