import { Directive, Input, OnInit, OnDestroy, OnChanges, AfterContentInit } from '@angular/core';
import { Subscription } from 'rxjs';
import * as THREE from 'three';

import { ChronosService } from '@ngs/core/chronos.service';
import { CameraService } from '@ngt/service';
// import { Content } from '@angular/compiler/src/render3/r3_ast';

// TODO - Partially Augment camera into a content class that provides settings in

@Directive({
  selector: 'ngt-camera'     // tslint:disable-line
})
export class PerspectiveCameraDirective implements OnInit, OnChanges, OnDestroy, AfterContentInit {
  // element parameters
  @Input() location: THREE.Vector3;
  @Input() rotation: THREE.Euler;
  @Input() lookAt: THREE.Vector3;
  @Input() viewAngle: number;

  // private scene: THREE.Scene;

  // private viewAngle: number;
  private aspect: number;
  private near: number;
  private far: number;

  // private message: any;
  private chronosID: string;
  private renderID: string;

  private subscription: Subscription;
  private width: number;
  private height: number;

  public camera: THREE.PerspectiveCamera;
  public cameraHelper: THREE.CameraHelper;

  constructor (
    private chronosService: ChronosService,
    private cameraService: CameraService
  ) {
    this.chronosID = '';
    this.renderID = '';

    this.location = new THREE.Vector3(0, 0, 0);
    this.rotation = new THREE.Euler(0, 0, 0, 'XYZ');
    this.lookAt = new THREE.Vector3(0, 0, 0);

    this.viewAngle = 75;
    this.near = 0.1;
    this.far = 10000;
    this.aspect = this.width / this.height;

    this.camera = new THREE.PerspectiveCamera(this.viewAngle, this.aspect, this.near, this.far);
    this.cameraHelper = new THREE.CameraHelper( this.camera );

    // subscribe to home component messages
    this.subscription = this.chronosService.getMessage().subscribe(
      message => {
        if (message.type === 'elementSize' && message.id === this.chronosID) {
          this.width = message.width;
          this.height = message.height;
          this.updateAspect(this.width / this.height);
        }
        if (message.type === 'enableLayer' && message.id === this.chronosID) {
          this.camera.layers.enable(message.layerNo);
        }
        if (message.type === 'toggleLayer' && message.id === this.chronosID) {
          this.camera.layers.toggle(message.layerNo);
        }
        if (message.type === 'disableLayer' && message.id === this.chronosID) {
          this.camera.layers.disable(message.layerNo);
        }
        if (message.type === 'setSetDefaultCameraPosition' && message.id === this.chronosID) {
          this.changeCameraDefaultPosition ();
        }
        if (message.type === 'switchToCamera' && message.id === this.chronosID) {
          console.log ('switchToCamera', message.index);
        }
      }
    );
  }

  ngOnChanges (changes) {
    if (changes.viewAngle && changes.viewAngle.currentValue) {
      this.viewAngle = changes.viewAngle.currentValue;
      this.camera.fov = this.viewAngle;
    }

    if (changes.location && changes.location.currentValue) {
      this.location = changes.location.currentValue;
    }
    if (changes.rotation && changes.rotation.currentValue) {
      this.rotation = changes.rotation.currentValue;
    }
    if (changes.lookAt && changes.lookAt.currentValue) {
      this.lookAt = changes.lookAt.currentValue;
    }
    if (this.camera && (
      (changes.location && changes.location.currentValue) ||
      (changes.rotation && changes.rotation.currentValue) ||
      (changes.lookAt && changes.lookAt.currentValue))
    ) {
      this.setPosition(this.location, this.rotation, this.lookAt);
    }
  }

  ngOnInit () {
    this.setPosition (this.location, this.rotation, this.lookAt);
  }

  ngAfterContentInit (): void {}

  ngOnDestroy () {
    this.subscription.unsubscribe();
  }

  // ---------------------------------------------------------------------------------

  updateAspect (ratio: number): void {
    if (this.camera) {
      this.camera.aspect = ratio;
      this.camera.updateProjectionMatrix();
    }
  }

  setPosition (location: THREE.Vector3, rotation: THREE.Euler, lookAt: THREE.Vector3): void {
    this.camera.position.set(location.x, location.y, location.z);
    this.camera.rotation.set(rotation.x, rotation.y, rotation.z, rotation.order);
  }

  processID (chronosID: string, renderID: string): void {
    this.chronosID = chronosID;
    this.renderID = renderID;
  }

  changeCameraDefaultPosition (): void {
    const positionObject: THREE.Object3D =  this.cameraService.getDefaultPosition();

    console.log ('changeCameraDefaultPosition', positionObject);

    this.setPosition (positionObject.position, positionObject.rotation, this.lookAt);
    this.camera.updateProjectionMatrix();
  }
}

// More reading:
//   https://threejs.org/docs/#api/en/cameras/PerspectiveCamera
