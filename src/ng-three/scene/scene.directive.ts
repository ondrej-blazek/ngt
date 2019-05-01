import { Directive, ContentChild, OnChanges, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import * as THREE from 'three';
// import { Subscription } from 'rxjs';

// import { ChronosService } from '@ngs/core/chronos.service';
import { CameraDirective, RaycasterDirective, ProjectorDirective } from '@ngt/camera';
import { EnvironmentDirective } from './environment.directive';
import { GeometryDirective } from './geometry.directive';
import { LightDirective } from './light.directive';

@Directive({
  selector: 'ngt-scene'     // tslint:disable-line
})
export class SceneDirective implements OnChanges, OnInit, AfterContentInit, OnDestroy {
  @ContentChild(CameraDirective) cameraDirective: any;
  @ContentChild(RaycasterDirective) raycasterDirective: any;
  @ContentChild(ProjectorDirective) projectorDirective: any;
  @ContentChild(EnvironmentDirective) environmentDirective: any;
  @ContentChild(GeometryDirective) geometryDirective: any;            // TODO - children use this to group objects into layers.
  @ContentChild(LightDirective) lightDirective: any;

  // private subscription: Subscription;
  private parentID: string;

  public scene: THREE.Scene = new THREE.Scene();

  get camera() {     // Called by render directive
    return this.cameraDirective.camera;
  }

  constructor(
    // private chronosService: ChronosService,
  ) {
    this.parentID = '';

    // subscribe to home component messages
    // this.subscription = this.chronosService.getMessage().subscribe(
    //   message => {
    //     // Call function or event
    //   }
    // );
  }

  ngOnChanges(changes) {}

  ngOnInit() {
    if (this.environmentDirective) this.environmentDirective.setScene(this.scene);
    if (this.geometryDirective) this.geometryDirective.setScene(this.scene);
    if (this.lightDirective) this.lightDirective.setScene(this.scene);

    // Camera
    if (this.cameraDirective) {
      this.camera.lookAt(this.scene.position);
      this.scene.add(this.camera);
      // this.scene.add(this.cameraDirective.cameraHelper);     // TODO - investigate the errors
    }

    // RayCaster
    if (this.raycasterDirective && this.cameraDirective) {
      this.raycasterDirective.setScene(this.scene);
      this.raycasterDirective.setCamera(this.camera);
    }

    // Projector to 2D
    if (this.projectorDirective && this.cameraDirective) {
      this.projectorDirective.setScene(this.scene);
      this.projectorDirective.setCamera(this.camera);
    }
  }

  ngAfterContentInit() {
    // console.log ('Scene children', this.scene.children);
  }

  ngOnDestroy():void {
    this.scene.remove();
  }

  renderID(passDown: string): void {
    this.parentID = passDown;
    this.propagateID (passDown);
  }

  propagateID(passDown: string) {
    if (this.cameraDirective) this.cameraDirective.renderID(passDown);
    if (this.raycasterDirective) this.raycasterDirective.renderID(passDown);
    if (this.projectorDirective) this.projectorDirective.renderID(passDown);
    if (this.environmentDirective) this.environmentDirective.renderID(passDown);
    if (this.geometryDirective) this.geometryDirective.renderID(passDown);
    if (this.lightDirective) this.lightDirective.renderID(passDown);
  }

  render(): void {
    this.propagateRender ();
  }

  propagateRender (): void {
    if (this.raycasterDirective) this.raycasterDirective.render();
    if (this.projectorDirective) this.projectorDirective.render();
    if (this.geometryDirective) this.geometryDirective.render();
    if (this.lightDirective) this.lightDirective.render();
  }
}
