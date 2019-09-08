import { OnInit, Directive, ContentChildren, QueryList, AfterContentInit, Input, OnChanges } from '@angular/core';

import { SceneService } from '@ngt/service';
import { PointLightDirective, HemisphereLightDirective, GltfLightDirective } from '@ngt/light';

@Directive({
  selector: 'ngt-light'     // tslint:disable-line
})
export class LightDirective implements OnChanges, OnInit, AfterContentInit {
  // element parameters
  @Input() helpers: boolean;

  // child components / directives
  @ContentChildren(PointLightDirective) pointLightDomQuery: QueryList<PointLightDirective>;
  @ContentChildren(HemisphereLightDirective) hemiLightDomQuery: QueryList<HemisphereLightDirective>;
  @ContentChildren(GltfLightDirective) gltfLightDomQuery: QueryList<GltfLightDirective>;

  private scene: THREE.Scene;
  private chronosID: string;
  private renderID: string;

  private pointLightDirectives: PointLightDirective[];
  private hemiLightDirectives: HemisphereLightDirective[];
  private gltfLightDirectives: GltfLightDirective[];

  constructor (
    private sceneService: SceneService
  ) {
    this.helpers = false;
    this.chronosID = '';
    this.renderID = '';

    this.pointLightDirectives = [];
    this.hemiLightDirectives = [];
    this.gltfLightDirectives = [];
  }

  ngOnChanges (changes) {
    if (changes.helpers) {
      this.helpers = changes.helpers.currentValue;
    }
  }

  ngOnInit () {
    this.scene = this.sceneService.getScene(this.chronosID, this.renderID);
  }

  ngAfterContentInit () {
    // Collect handlers into Array
    this.pointLightDirectives = this.pointLightDomQuery.toArray();
    this.hemiLightDirectives = this.hemiLightDomQuery.toArray();
    this.gltfLightDirectives = this.gltfLightDomQuery.toArray();

    this.propagateID (this.chronosID, this.renderID);

    // Add lights and their helper objects into the scene
    for (const oneDirective of this.pointLightDirectives) {
      this.scene.add(oneDirective.light);
      if (this.helpers === true) {
        this.scene.add(oneDirective.lightHelper);
      }
    }
    for (const oneDirective of this.hemiLightDirectives) {
      this.scene.add(oneDirective.light);
      if (this.helpers === true) {
        this.scene.add(oneDirective.lightHelper);
      }
    }
  }

  // ---------------------------------------------------------------------------------

  processID (chronosID: string, renderID: string): void {
    this.chronosID = chronosID;
    this.renderID = renderID;
  }

  propagateID (chronosID: string, renderID: string): void {
    for (const oneDirective of this.pointLightDirectives) {
      oneDirective.processID(chronosID, renderID);
    }
    for (const oneDirective of this.hemiLightDirectives) {
      oneDirective.processID(chronosID, renderID);
    }
    for (const oneDirective of this.gltfLightDirectives) {
      oneDirective.processID(chronosID, renderID);
    }
  }

  render (): void {
    this.propagateRender();
  }

  propagateRender (): void {
    for (const oneDirective of this.pointLightDirectives) {
      oneDirective.render();
    }
    for (const oneDirective of this.hemiLightDirectives) {
      oneDirective.render();
    }
    for (const oneDirective of this.gltfLightDirectives) {
      oneDirective.render();
    }
  }
}
