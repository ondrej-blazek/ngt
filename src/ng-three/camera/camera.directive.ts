import { Directive, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import * as THREE from 'three';

import { ChronosService } from '@ngs/core/chronos.service';

// TODO - Partially Augment camera into a content class that provides settings in 
// TODO - Another directive to make Orthographic camera

@Directive({
  selector: 'ngt-camera'
})
export class CameraDirective implements OnInit, OnDestroy {
  // element parameters 
  @Input() location: number[];    // THREE.Vector3
  @Input() rotation: number[];    // THREE.Euler

  private viewAngle: number = 75;
  private aspect: number;
  private near: number = 0.1;
  private far: number = 10000;
  
  private message: any;
  private parentID: string;
  private subscription: Subscription;
  private width: number;
  private height: number;

  public camera: THREE.PerspectiveCamera;

  constructor(
    private chronosService: ChronosService,
  ) {
    this.parentID = '';
    this.location = [0, 0, 0];
    this.rotation = [0, 0, 0];

    this.aspect = this.width / this.height;
    this.camera = new THREE.PerspectiveCamera(this.viewAngle, this.aspect, this.near, this.far);

    // subscribe to home component messages
    this.subscription = this.chronosService.getMessage().subscribe(
      message => {
        this.processMessage (message);
      }
    );
  }

  ngOnInit() {
    this.setPosition (this.location, this.rotation);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnChanges(changes) {
    if((changes.location && changes.location.currentValue) || (changes.rotation && changes.rotation.currentValue)) {
      this.setPosition(this.location, this.rotation);
    }
  }

  updateAspect(ratio) {
    if(this.camera) {
      this.camera.aspect = ratio;
      this.camera.updateProjectionMatrix();
    }
  }

  setPosition(location, rotation) {
    this.camera.position.set(location[0], location[1], location[2]);
    this.camera.rotation.set(THREE.Math.degToRad (rotation[0]), THREE.Math.degToRad (rotation[1]), THREE.Math.degToRad (rotation[2]), 'XYZ');
  }

  processMessage (message: any):void {
    this.message = message;
    if (this.message.type === 'elementSize' && this.message.id === this.parentID ) {
      this.width = this.message.width;
      this.height = this.message.height;
      this.updateAspect(this.width / this.height);
    }
  }

  renderID(passDown: string): void {
    this.parentID = passDown;
  }
}
