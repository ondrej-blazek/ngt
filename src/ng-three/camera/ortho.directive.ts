import { Directive, Input, OnInit, OnDestroy, OnChanges, AfterContentInit } from '@angular/core';
import { Subscription } from 'rxjs';
import * as THREE from 'three';

import { ChronosService } from '@ngs/core/chronos.service';

// TODO - Partially Augment camera into a content class that provides settings in

/*
 *     TOO BROKEN!!!  NOT READY YET!!!!
 */


@Directive({
  selector: 'ngt-camera-ortho'     // tslint:disable-line
})
export class OrthoCameraDirective implements OnInit, OnChanges, OnDestroy, AfterContentInit {
  // element parameters
  @Input() location: THREE.Vector3;
  @Input() rotation: THREE.Euler;

  // private scene: THREE.Scene;

  // private viewAngle: number;
  // private aspect: number;
  // private near: number;
  // private far: number;

  // private message: any;
  private chronosID: string;
  private renderID: string;

  private subscription: Subscription;
  private width: number;
  private height: number;

  public camera: THREE.OrthographicCamera;
  public cameraHelper: THREE.CameraHelper;

  constructor (
    private chronosService: ChronosService
  ) {
    this.chronosID = '';
    this.renderID = '';
    this.location = new THREE.Vector3(0, 0, 0);
    this.rotation = new THREE.Euler(0, 0, 0, 'XYZ');

    // this.viewAngle = 75;
    // this.near = 0.1;
    // this.far = 10000;
    // this.aspect = this.width / this.height;

    this.camera = new THREE.OrthographicCamera( - (this.width / 2), (this.width / 2), (this.height / 2), - (this.height / 2), 1, 1000 );
    this.cameraHelper = new THREE.CameraHelper( this.camera );

    // subscribe to home component messages
    this.subscription = this.chronosService.getMessage().subscribe(
      message => {
        if (message.type === 'elementSize' && message.id === this.chronosID ) {
          this.width = message.width;
          this.height = message.height;
          this.updateAspect(this.width / this.height);
        }
        if (message.type === 'enableLayer' && message.id === this.chronosID ) {
          this.camera.layers.enable(message.layerNo);
        }
        if (message.type === 'toggleLayer' && message.id === this.chronosID ) {
          this.camera.layers.toggle(message.layerNo);
        }
        if (message.type === 'disableLayer' && message.id === this.chronosID ) {
          this.camera.layers.disable(message.layerNo);
        }
      }
    );
  }

  ngOnChanges (changes) {
    if ((changes.location && changes.location.currentValue) || (changes.rotation && changes.rotation.currentValue)) {
      this.setPosition(this.location, this.rotation);
    }
  }

  ngOnInit () {
    this.setPosition (this.location, this.rotation);
  }

  ngAfterContentInit (): void {}

  ngOnDestroy () {
    this.subscription.unsubscribe();
  }

  // ---------------------------------------------------------------------------------

  updateAspect (ratio: number): void {
    if (this.camera) {
      // this.camera.aspect = ratio;
      this.camera.updateProjectionMatrix();
    }
  }

  setPosition (location: THREE.Vector3, rotation: THREE.Euler): void {
    this.camera.position.set(location.x, location.y, location.z);
    this.camera.rotation.set(rotation.x, rotation.y, rotation.z, rotation.order);
  }

  processID (chronosID: string, renderID: string): void {
    this.chronosID = chronosID;
    this.renderID = renderID;
  }
}

// More reading:
//   https://threejs.org/docs/#api/en/cameras/OrthographicCamera
