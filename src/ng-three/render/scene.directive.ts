import { Directive, ContentChild, OnChanges, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import * as THREE from 'three';

import { SceneService } from '@ngt/service';
import { EnvironmentDirective, GeometryDirective, LightDirective } from '@ngt/scene';

@Directive({
  selector: 'ngt-scene'     // tslint:disable-line
})
export class SceneDirective implements OnChanges, OnInit, AfterContentInit, OnDestroy {
  @ContentChild(EnvironmentDirective, {static: true}) environmentDirective: any;
  @ContentChild(GeometryDirective, {static: true}) geometryDirective: any;
  @ContentChild(LightDirective, {static: true}) lightDirective: any;

  private chronosID: string;
  private renderID: string;
  public scene: THREE.Scene;

  constructor (
    private sceneService: SceneService
  ) {
    this.chronosID = '';
    this.renderID = '';
    this.scene = new THREE.Scene ();
  }

  ngOnChanges (changes) {}
  ngOnInit () {
    this.sceneService.setScene(this.chronosID, this.renderID, this.scene);
  }
  ngAfterContentInit () {}
  ngOnDestroy (): void {
    this.scene.remove();
  }

  // ---------------------------------------------------------------------------------

  processID (chronosID: string, renderID: string): void {     // Executed BEFORE ngOnInit
    this.chronosID = chronosID;
    this.renderID = renderID;

    this.propagateID (this.chronosID, this.renderID);
  }

  propagateID (chronosID: string, renderID: string): void {
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
    if (this.geometryDirective) {
      this.geometryDirective.render();
    }
    if (this.lightDirective) {
      this.lightDirective.render();
    }
  }
}
