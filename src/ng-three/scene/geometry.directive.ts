import { OnInit, Directive, ContentChildren, QueryList, AfterContentInit } from '@angular/core';

import { SceneService } from '@ngt/service';
import { ObjectDirective, DynamicDirective, LayerDirective, GltfDirective } from '@ngt/geometry';

@Directive({
  selector: 'ngt-geometry'     // tslint:disable-line
})
export class GeometryDirective implements OnInit, AfterContentInit {
  @ContentChildren(ObjectDirective) objectDomQuery: QueryList<ObjectDirective>;
  @ContentChildren(GltfDirective) gltfDomQuery: QueryList<GltfDirective>;
  @ContentChildren(DynamicDirective) dynamicDomQuery: QueryList<DynamicDirective>;
  @ContentChildren(LayerDirective) layerDomQuery: QueryList<LayerDirective>;

  private scene: THREE.Scene;
  private chronosID: string;
  private renderID: string;

  private objectDirectives: ObjectDirective[] = [];
  private gltfDirectives: GltfDirective[] = [];
  private dynamicDirectives: DynamicDirective[] = [];
  private layerDirectives: LayerDirective[] = [];

  constructor (
    private sceneService: SceneService
  ) {
    this.chronosID = '';
    this.renderID = '';
  }

  ngOnInit () {
    this.scene = this.sceneService.getScene(this.chronosID, this.renderID);

    console.log ('GeometryDirective - ngOnInit', this.chronosID, this.renderID, this.layerDirectives);
  }

  ngAfterContentInit () {
    this.objectDirectives = this.objectDomQuery.toArray();
    this.gltfDirectives = this.gltfDomQuery.toArray();
    this.dynamicDirectives = this.dynamicDomQuery.toArray();
    this.layerDirectives = this.layerDomQuery.toArray();

    console.log ('GeometryDirective - ngAfterContentInit', this.chronosID, this.renderID, this.layerDirectives);

    this.propagateID (this.chronosID, this.renderID);

    // Pickup objects from directives
    for (const oneDirective of this.objectDirectives) {
      this.scene.add(oneDirective.object);
    }

    for (const oneDirective of this.dynamicDirectives) {
      for (const element of oneDirective.objectArray) {
        this.scene.add(element['object']);
      }
    }

    // Pass scene down to directive
    // for (const oneDirective of this.gltfDirectives) {
    //   oneDirective.setScene(this.scene);
    // }

    for (const oneDirective of this.layerDirectives) {
      oneDirective.setScene(this.scene);
    }
  }

  // ---------------------------------------------------------------------------------

  processID (chronosID: string, renderID: string): void {     // Executed BEFORE ngOnInit
    this.chronosID = chronosID;
    this.renderID = renderID;

    console.log ('GeometryDirective - processID', this.chronosID, this.renderID);
  }

  propagateID (chronosID: string, renderID: string): void {

    console.log ('GeometryDirective - propagateID', this.chronosID, this.renderID, this.layerDirectives);

    for (const oneDirective of this.gltfDirectives) {
      oneDirective.processID(chronosID, renderID);
    }
    for (const oneDirective of this.layerDirectives) {
      oneDirective.processID(chronosID, renderID);
    }
  }

  render (): void {
    this.propagateRender();
  }

  propagateRender (): void {
    for (const oneDirective of this.objectDirectives) {
      oneDirective.render();
    }
    for (const oneDirective of this.gltfDirectives) {
      oneDirective.render();
    }
    for (const oneDirective of this.dynamicDirectives) {
      oneDirective.render();
    }
    for (const oneDirective of this.layerDirectives) {
      oneDirective.render();
    }
  }
}
