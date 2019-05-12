import { OnInit, Directive, ContentChildren, QueryList, AfterContentInit, AfterViewInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ChronosService } from '@ngs/core/chronos.service';
import { ObjectDirective } from './object.directive';
import { DynamicDirective } from './dynamic.directive';

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

    // TODO - notify channel of active layer
    // TODO - enable layers on camera and lights

    // subscribe to home component messages
    this.subscription = this.chronosService.getMessage().subscribe(
      message => {
        // if (message.type === 'mouseMove' && message.id === this.parentID) {}
      }
    );
  }

  ngOnChanges (changes) {
    // if (changes.layer) {           // DO NOT allow layer be re-assigned
    //   this.layer = changes.layer.currentValue;
    // }
    if (changes.visible) {
      this.visible = changes.visible.currentValue;
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

// More reading:
//   https://threejs.org/docs/#api/en/core/Layers
