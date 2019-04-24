import { Directive, ContentChild, OnChanges, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import * as THREE from 'three';
import { Subscription } from 'rxjs';

import { ChronosService } from '@ngs/core/chronos.service';
import { CameraDirective } from '@ngt/camera';
import { EnvironmentDirective } from './environment.directive';
import { GeometryDirective } from './geometry.directive';
import { LightDirective } from './light.directive';

@Directive({
  selector: 'ngt-scene'
})
export class SceneDirective implements OnChanges, OnInit, AfterContentInit, OnDestroy {
  @ContentChild(CameraDirective) cameraDirective: any;
  @ContentChild(EnvironmentDirective) environmentDirective: any;
  @ContentChild(GeometryDirective) geometryDirective: any;
  @ContentChild(LightDirective) lightDirective: any;

  private subscription: Subscription;
  private parentID: string;
  private rayCaster: THREE.Raycaster;
  // private mouse: THREE.Vector2;

  public scene: THREE.Scene = new THREE.Scene();

  get camera() {        // Called by render directive
    return this.cameraDirective.camera;
  }

  constructor(
    private chronosService: ChronosService,
  ) {
    this.parentID = '';
    this.rayCaster = new THREE.Raycaster();
    // this.mouse = new THREE.Vector2();

    // subscribe to home component messages
    this.subscription = this.chronosService.getMessage().subscribe(
      message => {
        if (message.type === 'mouseMove') this.rayCast(message.mouse);
      }
    );
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
  }

  ngAfterContentInit() {
    // console.log ('Scene children', this.scene.children);
  }

  ngOnDestroy():void {
    this.scene.remove();
  }

  rayCast (mouse:THREE.Vector2):void {
    // console.log (mouse.x, mouse.y);

    // console.log (this.mouse);
    this.rayCaster.setFromCamera( mouse, this.camera );
    let intersects = this.rayCaster.intersectObjects( this.scene.children );
    console.log ('intersects', intersects);
  }

  renderID(passDown: string): void {
    this.parentID = passDown;
    this.propagateID (passDown);
  }

  propagateID(passDown: string) {
    if (this.cameraDirective) this.cameraDirective.renderID(passDown);
    if (this.environmentDirective) this.environmentDirective.renderID(passDown);
    if (this.geometryDirective) this.geometryDirective.renderID(passDown);
    if (this.lightDirective) this.lightDirective.renderID(passDown);
  }

  propagateRender (): void {
    if (this.geometryDirective) this.geometryDirective.render();
    if (this.lightDirective) this.lightDirective.render();
  }

  render(): void {
    this.propagateRender ();
  }
}
