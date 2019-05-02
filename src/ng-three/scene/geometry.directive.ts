import { OnInit, Directive, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { ObjectDirective, DynamicDirective } from '@ngt/geometry';

@Directive({
  selector: 'ngt-geometry'     // tslint:disable-line
})
export class GeometryDirective implements OnInit, AfterContentInit {
  @ContentChildren(ObjectDirective) objectDomQuery: QueryList<ObjectDirective>;
  @ContentChildren(DynamicDirective) dynamicDomQuery: QueryList<DynamicDirective>;

  private scene: THREE.Scene;
  private parentID: string;

  private objectDirectives: ObjectDirective[] = [];
  private dynamicDirectives: DynamicDirective[] = [];

  constructor () {
    this.parentID = '';
  }

  ngOnInit () {}

  ngAfterContentInit () {
    this.objectDirectives = this.objectDomQuery.toArray();
    this.dynamicDirectives = this.dynamicDomQuery.toArray();

    for (const oneDirective of this.objectDirectives) {
      this.scene.add(oneDirective.object);
    }

    for (const oneDirective of this.dynamicDirectives) {
      for (const element of oneDirective.objectArray) {
        this.scene.add(element['object']);
      }
    }
  }

  renderID (passDown: string): void {
    this.parentID = passDown;
  }

  setScene (masterScene: THREE.Scene): void {
    this.scene = masterScene;
  }

  propagateRender (): void {
    for (const oneDirective of this.objectDirectives) {
      oneDirective.render();
    }
    for (const oneDirective of this.dynamicDirectives) {
      oneDirective.render();
    }
  }

  render (): void {
    this.propagateRender();
  }
}
