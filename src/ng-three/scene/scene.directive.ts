import { Directive, ContentChild, OnChanges, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import * as THREE from 'three';

import { PerspectiveCameraDirective, OrthoCameraDirective, RaycasterDirective, ProjectorDirective } from '@ngt/camera';
import { EnvironmentDirective } from './environment.directive';
import { GeometryDirective } from './geometry.directive';
import { LightDirective } from './light.directive';

@Directive({
  selector: 'ngt-scene'     // tslint:disable-line
})
export class SceneDirective implements OnChanges, OnInit, AfterContentInit, OnDestroy {
  @ContentChild(PerspectiveCameraDirective) cameraDirective: any;
  @ContentChild(OrthoCameraDirective) orthoDirective: any;
  @ContentChild(RaycasterDirective) raycasterDirective: any;
  @ContentChild(ProjectorDirective) projectorDirective: any;
  @ContentChild(EnvironmentDirective) environmentDirective: any;
  @ContentChild(GeometryDirective) geometryDirective: any;
  @ContentChild(LightDirective) lightDirective: any;

  private chronosID: string;
  private renderID: string;
  public scene: THREE.Scene;

  get camera () {     // Called by render directive
    let cameraValue = null;
    if (this.cameraDirective) {
      cameraValue = this.cameraDirective.camera;
    }
    if (this.orthoDirective) {
      cameraValue = this.orthoDirective.camera;
    }
    return cameraValue;
  }

  constructor () {
    this.chronosID = '';
    this.renderID = '';
    this.scene = new THREE.Scene ();
  }

  ngOnChanges (changes) {}

  ngOnInit () {
    if (this.environmentDirective) {
      this.environmentDirective.setScene(this.scene);
    }
    if (this.geometryDirective) {
      this.geometryDirective.setScene(this.scene);
    }
    if (this.lightDirective) {
      this.lightDirective.setScene(this.scene);
    }

    // Camera
    if (this.camera !== null) {
      this.camera.lookAt(this.scene.position);
      this.scene.add(this.camera);
    }

    // RayCaster
    if (this.raycasterDirective && this.camera !== null) {
      this.raycasterDirective.setScene(this.scene);
      this.raycasterDirective.setCamera(this.camera);
    }

    // Projector to 2D
    if (this.projectorDirective && this.camera !== null) {
      this.projectorDirective.setScene(this.scene);
      this.projectorDirective.setCamera(this.camera);
    }
  }

  ngAfterContentInit () {
    console.log ('ngAfterContentInit - this.chronosID', this.chronosID, this.scene);
  }

  ngOnDestroy (): void {
    this.scene.remove();
  }

  // ---------------------------------------------------------------------------------

  processID (chronosID: string, renderID: string): void {
    this.chronosID = chronosID;
    this.renderID = renderID;

    console.log ('processID - this.chronosID', this.chronosID, this.renderID, this.scene);

    this.propagateID (this.chronosID, this.renderID);
  }

  propagateID (chronosID: string, renderID: string): void {
    if (this.cameraDirective) {
      this.cameraDirective.processID(chronosID);
    }
    if (this.orthoDirective) {
      this.orthoDirective.processID(chronosID);
    }
    if (this.raycasterDirective) {
      this.raycasterDirective.processID(chronosID);
    }
    if (this.projectorDirective) {
      this.projectorDirective.processID(chronosID);
    }
    if (this.environmentDirective) {
      this.environmentDirective.processID(chronosID);
    }
    if (this.geometryDirective) {
      this.geometryDirective.processID(chronosID);
    }
    if (this.lightDirective) {
      this.lightDirective.processID(chronosID);
    }
  }

  render (): void {
    this.propagateRender ();
  }

  propagateRender (): void {
    if (this.raycasterDirective) {
      this.raycasterDirective.render();
    }
    if (this.projectorDirective) {
      this.projectorDirective.render();
    }
    if (this.geometryDirective) {
      this.geometryDirective.render();
    }
    if (this.lightDirective) {
      this.lightDirective.render();
    }
  }
}
