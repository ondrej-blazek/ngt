import { OnInit, Directive, ContentChildren, QueryList, AfterContentInit, AfterViewInit, Input } from '@angular/core';
import { ObjectDirective } from './object.directive';
import { DynamicDirective } from './dynamic.directive';

@Directive({
  selector: 'ngt-layer'     // tslint:disable-line
})
export class LayerDirective implements OnInit, AfterContentInit, AfterViewInit {
  @Input() layer: number;
  @Input() visible: boolean;

  @ContentChildren(ObjectDirective) objectDomQuery: QueryList<ObjectDirective>;
  @ContentChildren(DynamicDirective) dynamicDomQuery: QueryList<DynamicDirective>;


  private scene: THREE.Scene;
  private parentID: string;

  private objectDirectives: ObjectDirective[] = [];
  private dynamicDirectives: DynamicDirective[] = [];

  constructor () {
    this.layer = 0;
    this.visible = true;
    this.parentID = '';

    // TODO - validate layer for 0-31
    // TODO - notify channel of active layer
    // TODO - enable layers on camera and lights

    // More info:  https://threejs.org/docs/#api/en/core/Layers
  }

  ngOnInit () {}
  ngAfterContentInit () {}

  ngAfterViewInit () {
    this.objectDirectives = this.objectDomQuery.toArray();
    this.dynamicDirectives = this.dynamicDomQuery.toArray();

    if (this.visible){
      for (const oneDirective of this.objectDirectives) {
        oneDirective.object.layers.set(this.layer);
        this.scene.add(oneDirective.object);
      }
      for (const oneDirective of this.dynamicDirectives) {
        for (const element of oneDirective.objectArray) {
          this.scene.add(element['object']);
        }
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
    if (this.visible){
      for (const oneDirective of this.objectDirectives) {
        oneDirective.render();
      }
      for (const oneDirective of this.dynamicDirectives) {
        oneDirective.render();
      }
    }
  }

  render (): void {
    this.propagateRender();
  }
}
