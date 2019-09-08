import { Directive, ContentChild, AfterContentInit, OnInit, OnDestroy } from '@angular/core';
import * as THREE from 'three';

import { SceneService } from '@ngt/service';
import { AxesDirective, BackgroundDirective, CubePanoramaDirective,
         DomeDirective, FogDirective, GridDirective, GroundDirective } from '@ngt/environment';

@Directive({
  selector: 'ngt-environment'     // tslint:disable-line
})
export class EnvironmentDirective implements OnInit, AfterContentInit, OnDestroy {
  @ContentChild(AxesDirective, {static: true}) axesDirective: any;
  @ContentChild(BackgroundDirective, {static: true}) backgroundDirective: any;
  @ContentChild(CubePanoramaDirective, {static: true}) cubePanoramaDirective: any;
  @ContentChild(DomeDirective, {static: true}) domeDirective: any;
  @ContentChild(FogDirective, {static: true}) fogDirective: any;
  @ContentChild(GridDirective, {static: true}) gridDirective: any;
  @ContentChild(GroundDirective, {static: true}) groundDirective: any;

  private scene: THREE.Scene;
  private chronosID: string;
  private renderID: string;

  constructor (
    private sceneService: SceneService
  ) {
    this.chronosID = '';
    this.renderID = '';
  }

  ngOnInit () {
    this.scene = this.sceneService.getScene(this.chronosID, this.renderID);
    this.scene.background = new THREE.Color(0xff0000);      // Scene MUST have background color. Use ngt-background to adjust
  }

  ngAfterContentInit () {
    // Add to the scene
    if (this.domeDirective) {
      this.scene.add(this.domeDirective.dome);
    }
    if (this.groundDirective) {
      this.scene.add(this.groundDirective.plane);
    }

    // Helpers objects
    if (this.axesDirective) {
      this.scene.add(this.axesDirective.axesHelper);
    }
    if (this.gridDirective) {
      this.scene.add(this.gridDirective.gridHelper);
    }
  }

  ngOnDestroy () {}

  // ---------------------------------------------------------------------------------

  processID (chronosID: string, renderID: string): void {
    this.chronosID = chronosID;
    this.renderID = renderID;

    this.propagateID (this.chronosID, this.renderID);
  }

  propagateID (chronosID: string, renderID: string): void {
    if (this.backgroundDirective) {
      this.backgroundDirective.processID(chronosID, renderID);
    }
    if (this.cubePanoramaDirective) {
      this.cubePanoramaDirective.processID(chronosID, renderID);
    }
    if (this.fogDirective) {
      this.fogDirective.processID(chronosID, renderID);
    }
  }
}
