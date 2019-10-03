import { Directive, ContentChild, ContentChildren, QueryList, OnChanges, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import * as THREE from 'three';
import { Subscription } from 'rxjs';

import { ChronosService } from '@ngs/core/chronos.service';
import { CameraService, SceneService } from '@ngt/service';
import { PerspectiveCameraDirective, OrthoCameraDirective, RaycasterDirective, ProjectorDirective, GltfCameraDataDirective } from '@ngt/camera';

@Directive({
  selector: 'ngt-vision'     // tslint:disable-line
})
export class VisionDirective implements OnChanges, OnInit, AfterContentInit, OnDestroy {
  @ContentChild(PerspectiveCameraDirective, {static: true}) cameraDirective: any;
  @ContentChild(OrthoCameraDirective, {static: true}) orthoDirective: any;
  @ContentChildren(GltfCameraDataDirective) gltfCameraDataDomQuery: QueryList<GltfCameraDataDirective>;
  @ContentChild(RaycasterDirective, {static: true}) raycasterDirective: any;
  @ContentChild(ProjectorDirective, {static: true}) projectorDirective: any;

  private subscription: Subscription;
  private chronosID: string;
  private renderID: string;
  private GltfCameraDataDirectives: GltfCameraDataDirective[];
  private scene: THREE.Scene;
  private renderer: THREE.WebGLRenderer;

  public camera: THREE.PerspectiveCamera | THREE.OrthographicCamera;

  constructor(
    private sceneService: SceneService,
    private cameraService: CameraService,
    private chronosService: ChronosService
  ) {
    this.chronosID = '';
    this.renderID = '';
    this.GltfCameraDataDirectives = [];

    // subscribe to home component messages
    this.subscription = this.chronosService.getMessage().subscribe(
      message => {
        if (message.type === 'setSetInitialCamera' && message.id === this.chronosID ) {
          // this.fetchCamera ();
        }
      }
    );
  }

  ngOnChanges (changes) {}
  ngOnInit () {}
  ngAfterContentInit () {
    this.renderer = this.sceneService.getRender(this.chronosID, this.renderID);
    this.scene = this.sceneService.getScene(this.chronosID, this.renderID);

    // Special case, Asyncload and data are not required to render
    this.GltfCameraDataDirectives = this.gltfCameraDataDomQuery.toArray();
    for (const oneDirective of this.GltfCameraDataDirectives) {
      oneDirective.processID(this.chronosID, this.renderID);
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
  ngOnDestroy (): void {}

  // ---------------------------------------------------------------------------------

  // fetchCamera (): void {}

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
    if (this.cameraDirective) {
      this.cameraDirective.processID(chronosID, renderID);
    }
    if (this.orthoDirective) {
      this.orthoDirective.processID(chronosID, renderID);
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
  }
}
