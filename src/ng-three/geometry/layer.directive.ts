import { OnInit, Directive, ContentChildren, QueryList, AfterContentInit, AfterViewInit, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';

import { ChronosService } from '@ngs/core/chronos.service';
import { ObjectDirective } from './object.directive';
import { DynamicDirective } from './dynamic.directive';

// TODO - add toggle feature, add or remove the objects from scene accordingly.
// TODO - front-end visual items is required prior task above.

@Directive({
  selector: 'ngt-layer'     // tslint:disable-line
})
export class LayerDirective implements OnInit, OnChanges, OnDestroy, AfterContentInit, AfterViewInit {
  @Input() layer: number;
  @Input() visible: boolean;

  @ContentChildren(ObjectDirective) objectDomQuery: QueryList<ObjectDirective>;
  @ContentChildren(DynamicDirective) dynamicDomQuery: QueryList<DynamicDirective>;

  private scene: THREE.Scene;
  private parentID: string;
  private subscription: Subscription;

  private objectDirectives: ObjectDirective[] = [];
  private dynamicDirectives: DynamicDirective[] = [];

  constructor (
    private chronosService: ChronosService
  ) {
    this.layer = 0;
    this.visible = true;
    this.parentID = '';

    // subscribe to home component messages
    this.subscription = this.chronosService.getMessage().subscribe(
      message => {
        // if (message.type === 'mouseMove' && message.id === this.parentID) {}
      }
    );
  }

  ngOnChanges (changes: SimpleChanges) {
    // if (changes.layer) {           // !!! DO NOT allow layer be re-assigned
    //   this.layer = changes.layer.currentValue;
    // }
    if (changes.visible) {

      console.log ('changes.visible', changes.visible, this.layer);

      // this.visible = true;
      this.visible = changes.visible.currentValue;
      // if (changes.visible.currentValue === true && changes.visible.previousValue === false) {
      //   this.chronosService.toggleLayer (this.parentID, this.layer);
      // }

      for (const oneDirective of this.objectDirectives) {
        oneDirective.object.layers.toggle(this.layer);
      }

    }
  }

  ngOnInit () {
    if (this.layer > 0 && this.layer < 32){
      this.chronosService.enableLayer (this.parentID, this.layer);
    } else {
      this.layer = 0;
    }
  }

  ngAfterContentInit () {}

  ngAfterViewInit () {
    this.objectDirectives = this.objectDomQuery.toArray();
    this.dynamicDirectives = this.dynamicDomQuery.toArray();

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

  ngOnDestroy (): void {
    this.subscription.unsubscribe();
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

// More reading:
//   https://threejs.org/docs/#api/en/core/Layers
