import { Directive, Input } from '@angular/core';
import * as THREE from 'three';
// import 'webvr-polyfill';
// import 'three/examples/js/controls/VRControls.js';
// import 'three/examples/js/effects/VREffect.js';

@Directive({
  selector: 'ngt-vr'
})
export class VrDirective {
  // element parameters
  @Input() height: number;
  @Input() width: number;
  @Input() enabled: boolean = true;

  public controls: any;
  public effect: any;

  constructor() { }

  // ngOnChanges(changes) {
  //   const widthChng = changes.width && changes.width.currentValue;
  //   const heightChng = changes.height && changes.height.currentValue;
    
  //   if(widthChng || heightChng) {
  //     this.setEffectSize(this.width, this.height);
  //   }
  // }

  // setupControls(camera, renderer) {
  //   if(this.enabled) {
  //     this.controls = new THREE.VRControls(camera);
  //     this.effect = new THREE.VREffect(renderer);
  //     this.setEffectSize(this.width, this.height);
  //   }
  // }

  // updateControls(scene, camera) {
  //   if(this.controls && this.effect) {
  //     this.controls.update();
  //     this.effect.render(scene, camera);
  //   }
  // }

  // setEffectSize(width, height) {
  //   if(this.effect) {
  //     this.effect.setSize(width, height);
  //   }
  // }

  // requestVR(dom) {
  //   if(this.effect) {
  //     this.effect.requestPresent();
  //   }
  // }

  // resetVR() {
  //   if(this.controls) {
  //     this.controls.resetPose();
  //   }
  // }
}
