import { OnInit, Directive, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { ObjectDirective, DynamicDirective, LayerDirective } from '@ngt/geometry';

@Directive({
  selector: 'ngt-geometry'     // tslint:disable-line
})
export class GeometryDirective implements OnInit, AfterContentInit {
  @ContentChildren(ObjectDirective) objectDomQuery: QueryList<ObjectDirective>;
  @ContentChildren(DynamicDirective) dynamicDomQuery: QueryList<DynamicDirective>;
  @ContentChildren(LayerDirective) layerDomQuery: QueryList<LayerDirective>;

  private scene: THREE.Scene;
  private parentID: string;

  private objectDirectives: ObjectDirective[] = [];
  private dynamicDirectives: DynamicDirective[] = [];
  private layerDirectives: LayerDirective[] = [];

  constructor () {
    this.parentID = '';
  }

  ngOnInit () {}

  ngAfterContentInit () {
    this.objectDirectives = this.objectDomQuery.toArray();
    this.dynamicDirectives = this.dynamicDomQuery.toArray();
    this.layerDirectives = this.layerDomQuery.toArray();

    for (const oneDirective of this.objectDirectives) {
      this.scene.add(oneDirective.object);
    }

    for (const oneDirective of this.dynamicDirectives) {
      for (const element of oneDirective.objectArray) {
        this.scene.add(element['object']);
      }
    }

    for (const oneDirective of this.layerDirectives) {
      oneDirective.setScene(this.scene);
    }
  }

  setScene (masterScene: THREE.Scene): void {
    this.scene = masterScene;
  }

  renderID (passDown: string): void {
    this.parentID = passDown;
    this.propagateID (passDown);
  }

  propagateID (passDown: string): void {
    for (const oneDirective of this.layerDirectives) {
      oneDirective.renderID(passDown);
    }
  }

  render (): void {
    this.propagateRender();
  }

  propagateRender (): void {
    for (const oneDirective of this.objectDirectives) {
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
