import { Directive, ContentChild, ContentChildren, QueryList, OnChanges, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import * as THREE from 'three';

import { RaycasterDirective, ProjectorDirective, GltfCameraDataDirective } from '@ngt/camera';
import { SceneService } from '@ngt/service';

import { EnvironmentDirective } from './environment.directive';
import { GeometryDirective } from './geometry.directive';
import { LightDirective } from './light.directive';

@Directive({
  selector: 'ngt-scene'     // tslint:disable-line
})
export class SceneDirective implements OnChanges, OnInit, AfterContentInit, OnDestroy {
  @ContentChild(RaycasterDirective, {static: true}) raycasterDirective: any;
  @ContentChild(ProjectorDirective, {static: true}) projectorDirective: any;
  @ContentChildren(GltfCameraDataDirective) gltfCameraDataDomQuery: QueryList<GltfCameraDataDirective>;
  @ContentChild(EnvironmentDirective, {static: true}) environmentDirective: any;
  @ContentChild(GeometryDirective, {static: true}) geometryDirective: any;
  @ContentChild(LightDirective, {static: true}) lightDirective: any;

  private chronosID: string;
  private renderID: string;
  public camera: THREE.PerspectiveCamera | THREE.OrthographicCamera;
  public scene: THREE.Scene;
  private GltfCameraDataDirectives: GltfCameraDataDirective[];

  constructor (
    private sceneService: SceneService
  ) {
    this.chronosID = '';
    this.renderID = '';
    this.scene = new THREE.Scene ();
    this.GltfCameraDataDirectives = [];
  }

  ngOnChanges (changes) {}

  ngOnInit () {
    this.sceneService.setScene(this.chronosID, this.renderID, this.scene);

    // Camera
    if (this.camera) {
      this.scene.add(this.camera);
    }

    // RayCaster
    if (this.raycasterDirective && this.camera !== null) {
      this.raycasterDirective.setCamera(this.camera);
    }

    // Projector to 2D
    if (this.projectorDirective && this.camera !== null) {
      this.projectorDirective.setCamera(this.camera);
    }
  }

  ngAfterContentInit () {
    // Special case, Asyncload and data are not required to render
    this.GltfCameraDataDirectives = this.gltfCameraDataDomQuery.toArray();
    for (const oneDirective of this.GltfCameraDataDirectives) {
      oneDirective.processID(this.chronosID, this.renderID);
    }
  }

  ngOnDestroy (): void {
    this.scene.remove();
  }

  // ---------------------------------------------------------------------------------

  processCamera (camera: THREE.PerspectiveCamera | THREE.OrthographicCamera): void {     // Executed BEFORE ngOnInit
    this.camera = camera;
  }

  processID (chronosID: string, renderID: string): void {     // Executed BEFORE ngOnInit
    this.chronosID = chronosID;
    this.renderID = renderID;

    this.propagateID (this.chronosID, this.renderID);
  }

  propagateID (chronosID: string, renderID: string): void {
    if (this.raycasterDirective) {
      this.raycasterDirective.processID(chronosID, renderID);
    }
    if (this.projectorDirective) {
      this.projectorDirective.processID(chronosID, renderID);
    }
    if (this.environmentDirective) {
      this.environmentDirective.processID(chronosID, renderID);
    }
    if (this.geometryDirective) {
      this.geometryDirective.processID(chronosID, renderID);
    }
    if (this.lightDirective) {
      this.lightDirective.processID(chronosID, renderID);
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
