import { OnInit, Directive, ContentChildren, QueryList, AfterContentInit } from '@angular/core';

import { SceneService } from '@ngt/service';
import { ObjectDirective, DynamicDirective, LayerDirective, GltfSceneDirective, GltfMeshDirective } from '@ngt/geometry';

@Directive({
  selector: 'ngt-geometry'     // tslint:disable-line
})
export class GeometryDirective implements OnInit, AfterContentInit {
  @ContentChildren(ObjectDirective) objectDomQuery: QueryList<ObjectDirective>;
  @ContentChildren(GltfSceneDirective) gltfSceneDomQuery: QueryList<GltfSceneDirective>;
  @ContentChildren(GltfMeshDirective) gltfMeshDomQuery: QueryList<GltfMeshDirective>;
  @ContentChildren(DynamicDirective) dynamicDomQuery: QueryList<DynamicDirective>;
  @ContentChildren(LayerDirective) layerDomQuery: QueryList<LayerDirective>;

  private scene: THREE.Scene;
  private chronosID: string;
  private renderID: string;

  private objectDirectives: ObjectDirective[] = [];
  private GltfSceneDirectives: GltfSceneDirective[] = [];
  private GltfMeshDirectives: GltfMeshDirective[] = [];
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
  }

  ngAfterContentInit () {
    this.objectDirectives = this.objectDomQuery.toArray();
    this.GltfSceneDirectives = this.gltfSceneDomQuery.toArray();
    this.GltfMeshDirectives = this.gltfMeshDomQuery.toArray();
    this.dynamicDirectives = this.dynamicDomQuery.toArray();
    this.layerDirectives = this.layerDomQuery.toArray();

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
  }

  // ---------------------------------------------------------------------------------

  processID (chronosID: string, renderID: string): void {     // Executed BEFORE ngOnInit
    this.chronosID = chronosID;
    this.renderID = renderID;
  }

  propagateID (chronosID: string, renderID: string): void {
    for (const oneDirective of this.GltfSceneDirectives) {
      oneDirective.processID(chronosID, renderID);
    }
    for (const oneDirective of this.GltfMeshDirectives) {
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
    for (const oneDirective of this.GltfSceneDirectives) {
      oneDirective.render();
    }
    for (const oneDirective of this.GltfMeshDirectives) {
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
