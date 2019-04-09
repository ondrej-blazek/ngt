import { OnInit, Directive, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { ObjectDirective } from '@ngt/geometry';

@Directive({
  selector: 'ngt-geometry'
})
export class GeometryDirective implements OnInit, AfterContentInit {
  @ContentChildren(ObjectDirective) objectDomQuery: QueryList<ObjectDirective>;

  private scene: THREE.Scene;
  private parentID: string;

  private objectDirectives: ObjectDirective[] = [];

  constructor() {
    this.parentID = '';
  }

  ngOnInit() {}
  
  ngAfterContentInit() {
    this.objectDirectives = this.objectDomQuery.toArray();
    for(let oneDirective of this.objectDirectives) {
      this.scene.add(oneDirective.object);
    }
  }

  renderID(passDown: string): void {
    this.parentID = passDown;
  }

  setScene (masterScene:THREE.Scene):void {
    this.scene = masterScene;
  }

  propagateRender (): void {
    for(let oneDirective of this.objectDirectives) {
      oneDirective.render();
    }
  }

  render(): void {
    this.propagateRender();
  }
}
