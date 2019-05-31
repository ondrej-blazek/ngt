import { Directive, ContentChild, AfterContentInit, OnInit, OnDestroy } from '@angular/core';
import { AxesDirective, BackgroundDirective, CubePanoramaDirective, DomeDirective, FogDirective, GridDirective, GroundDirective } from '@ngt/environment';
import * as THREE from 'three';

@Directive({
  selector: 'ngt-environment'     // tslint:disable-line
})
export class EnvironmentDirective implements OnInit, AfterContentInit, OnDestroy {
  @ContentChild(AxesDirective) axesDirective: any;
  @ContentChild(BackgroundDirective) backgroundDirective: any;
  @ContentChild(CubePanoramaDirective) cubePanoramaDirective: any;
  @ContentChild(DomeDirective) domeDirective: any;
  @ContentChild(FogDirective) fogDirective: any;
  @ContentChild(GridDirective) gridDirective: any;
  @ContentChild(GroundDirective) groundDirective: any;

  private scene: THREE.Scene;
  private chronosID: string;

  constructor () {
    this.chronosID = '';
  }

  ngOnInit () {
    // Pass scene for additional changes
    if (this.backgroundDirective) {
      this.backgroundDirective.setScene(this.scene);
    }
    if (this.cubePanoramaDirective) {
      this.cubePanoramaDirective.setScene(this.scene);
    }
    if (this.fogDirective) {
      this.fogDirective.setScene(this.scene);
    }
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

  processID (passDown: string): void {
    this.chronosID = passDown;
  }

  setScene (masterScene: THREE.Scene): void {
    this.scene = masterScene;
  }
}
