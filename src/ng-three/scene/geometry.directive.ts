import { Directive, ContentChild, ContentChildren } from '@angular/core';
import { BoxDirective, SphereDirective } from '@ngt/geometry';

@Directive({
  selector: 'ngt-geometry'
})
export class GeometryDirective {
  @ContentChildren(BoxDirective) boxDirective: any;
  @ContentChildren(SphereDirective) sphereDirective: any;

  private scene: THREE.Scene;
  private parentID: string;

  constructor() {
    this.parentID = '';
  }
  
  ngAfterContentInit() {
    let boxDirectives: BoxDirective[] = this.boxDirective.toArray();
    for(let oneDirective of boxDirectives) {
      this.scene.add(oneDirective.box);
    }

    let sphereDirectives: SphereDirective[] = this.sphereDirective.toArray();
    for(let oneDirective of sphereDirectives) {
      this.scene.add(oneDirective.sphere);
    }
  }

  renderID(passDown: string): void {
    this.parentID = passDown;
  }

  setScene (masterScene:THREE.Scene):void {
    this.scene = masterScene;
  }
}