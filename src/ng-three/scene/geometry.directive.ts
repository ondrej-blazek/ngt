import { OnInit, Directive, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { BoxDirective, SphereDirective, ObjectDirective } from '@ngt/geometry';

@Directive({
  selector: 'ngt-geometry'
})
export class GeometryDirective implements OnInit, AfterContentInit {
  @ContentChildren(BoxDirective) boxDomQuery: QueryList<BoxDirective>;
  @ContentChildren(SphereDirective) sphereDomQuery: QueryList<SphereDirective>;
  @ContentChildren(ObjectDirective) objectDomQuery: QueryList<ObjectDirective>;

  private scene: THREE.Scene;
  private parentID: string;

  private boxDirectives: BoxDirective[] = [];
  private sphereDirectives: SphereDirective[] = [];
  private objectDirectives: ObjectDirective[] = [];

  constructor() {
    this.parentID = '';
  }

  ngOnInit() {}
  
  ngAfterContentInit() {
    this.boxDirectives = this.boxDomQuery.toArray();
    this.sphereDirectives = this.sphereDomQuery.toArray();
    this.objectDirectives = this.objectDomQuery.toArray();

    // Add objects to the scene
    for(let oneDirective of this.boxDirectives) {
      this.scene.add(oneDirective.box);
    }
    for(let oneDirective of this.sphereDirectives) {
      this.scene.add(oneDirective.sphere);
    }
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
    for(let oneDirective of this.boxDirectives) {
      oneDirective.render();
    }
    for(let oneDirective of this.sphereDirectives) {
      oneDirective.render();
    }
    for(let oneDirective of this.objectDirectives) {
      oneDirective.render();
    }
  }

  render(): void {
    this.propagateRender();
  }
}
