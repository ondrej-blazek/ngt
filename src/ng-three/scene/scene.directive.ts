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

  private parentID: string;

  public scene: THREE.Scene = new THREE.Scene ();

  get camera () {     // Called by render directive
    let cameraValue = null;
    if (this.cameraDirective) {
      cameraValue = this.cameraDirective.camera
    }
    if (this.orthoDirective) {
      cameraValue = this.orthoDirective.camera
    }
    return cameraValue;
  }

  constructor () {
    this.parentID = '';
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

  ngAfterContentInit () {}

  ngOnDestroy (): void {
    this.scene.remove();
  }

  renderID (passDown: string): void {
    this.parentID = passDown;
    this.propagateID (passDown);
  }

  propagateID (passDown: string): void {
    if (this.cameraDirective) {
      this.cameraDirective.renderID(passDown);
    }
    if (this.orthoDirective) {
      this.orthoDirective.renderID(passDown);
    }
    if (this.raycasterDirective) {
      this.raycasterDirective.renderID(passDown);
    }
    if (this.projectorDirective) {
      this.projectorDirective.renderID(passDown);
    }
    if (this.environmentDirective) {
      this.environmentDirective.renderID(passDown);
    }
    if (this.geometryDirective) {
      this.geometryDirective.renderID(passDown);
    }
    if (this.lightDirective) {
      this.lightDirective.renderID(passDown);
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
