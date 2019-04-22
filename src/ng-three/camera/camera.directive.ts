import { Directive, Input, OnInit, OnDestroy, OnChanges, AfterContentInit } from '@angular/core';
import { Subscription } from 'rxjs';
import * as THREE from 'three';

import { ChronosService } from '@ngs/core/chronos.service';

// TODO - Partially Augment camera into a content class that provides settings in 
// TODO - Another directive to make Orthographic camera

@Directive({
  selector: 'ngt-camera'
})
export class CameraDirective implements OnInit, OnChanges, OnDestroy, AfterContentInit {
  // element parameters 
  @Input() location: THREE.Vector3;
  @Input() rotation: THREE.Euler;

  private scene: THREE.Scene;
  
  private viewAngle: number;
  private aspect: number;
  private near: number;
  private far: number;
  
  private message: any;
  private parentID: string;
  private subscription: Subscription;
  private width: number;
  private height: number;

  public camera: THREE.PerspectiveCamera;
  public cameraHelper: THREE.CameraHelper;

  constructor(
    private chronosService: ChronosService,
  ) {
    this.parentID = '';
    this.location = new THREE.Vector3(0, 0, 0);
    this.rotation = new THREE.Euler(0, 0, 0, 'XYZ');

    this.viewAngle = 75;
    this.near = 0.1;
    this.far = 10000;

    this.aspect = this.width / this.height;
    this.camera = new THREE.PerspectiveCamera(this.viewAngle, this.aspect, this.near, this.far);
    this.cameraHelper = new THREE.CameraHelper( this.camera );

    // subscribe to home component messages
    this.subscription = this.chronosService.getMessage().subscribe(
      message => {
        this.processMessage (message);
      }
    );
  }

  ngOnChanges(changes) {
    if((changes.location && changes.location.currentValue) || (changes.rotation && changes.rotation.currentValue)) {
      this.setPosition(this.location, this.rotation);
    }
  }

  ngOnInit() {
    this.setPosition (this.location, this.rotation);
  }
  
  ngAfterContentInit():void {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  updateAspect(ratio:number):void {
    if(this.camera) {
      this.camera.aspect = ratio;
      this.camera.updateProjectionMatrix();
    }
  }

  setPosition(location:THREE.Vector3, rotation:THREE.Euler):void {
    this.camera.position.set(location.x, location.y, location.z);
    this.camera.rotation.set(rotation.x, rotation.y, rotation.z, rotation.order);
  }

  setScene (masterScene:THREE.Scene):void {
    this.scene = masterScene;
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
