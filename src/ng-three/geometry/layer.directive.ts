import {
  OnInit, Directive, ContentChildren, QueryList, AfterContentInit,
  AfterViewInit, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
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
  private chronosID: string;
  private subscription: Subscription;

  private objectDirectives: ObjectDirective[] = [];
  private dynamicDirectives: DynamicDirective[] = [];

  constructor (
    private chronosService: ChronosService
  ) {
    this.layer = 0;
    this.visible = true;
    this.chronosID = '';

    // subscribe to home component messages
    this.subscription = this.chronosService.getMessage().subscribe(
      message => {
        // if (message.type === 'mouseMove' && message.id === this.chronosID) {}
      }
    );
  }

  ngOnChanges (changes: SimpleChanges) {
    // if (changes.layer) {           // !!! DO NOT allow layer be re-assigned
    //   this.layer = changes.layer.currentValue;
    // }
    if (changes.visible) {
      this.visible = changes.visible.currentValue;

      // Toggle object withing layer
      this.toggleSingleObjects (this.objectDirectives, changes.visible.currentValue, changes.visible.previousValue);
      this.toggleDynamicObjects (this.dynamicDirectives, changes.visible.currentValue, changes.visible.previousValue);
    }
  }

  ngOnInit () {
    if (this.layer > 0 && this.layer < 32) {
      this.chronosService.enableLayer (this.chronosID, this.layer);
    } else {
      this.layer = 0;
    }
  }

  ngAfterContentInit () {}

  ngAfterViewInit () {
    this.objectDirectives = this.objectDomQuery.toArray();
    this.dynamicDirectives = this.dynamicDomQuery.toArray();

    // Add all objects to scene
    for (const oneDirective of this.objectDirectives) {
      oneDirective.object.layers.set(this.layer);
      this.scene.add(oneDirective.object);
    }
    for (const oneDirective of this.dynamicDirectives) {
      for (const element of oneDirective.objectArray) {
        this.scene.add(element['object']);
      }
    }

    // Initial state
    if (this.visible === false) {
      this.toggleSingleObjects (this.objectDirectives, false, true);
      this.toggleDynamicObjects (this.dynamicDirectives, false, true);
    }
  }

  ngOnDestroy (): void {
    this.subscription.unsubscribe();
  }

  processID (passDown: string): void {
    this.chronosID = passDown;
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

  toggleSingleObjects (objectDirectives: any[], currentValue: boolean, previousValue: boolean): void {
    for (const oneDirective of objectDirectives) {
      oneDirective.object.layers.toggle(this.layer);

      if (oneDirective.interact === true) {
        if (currentValue === true && previousValue === false) {
          // Add back reycaster interaction array
          this.chronosService.addToInteraction(oneDirective.object.uuid);
        } else {
          // Remove from reycaster interaction array
          this.chronosService.removeFromInteraction(oneDirective.object.uuid);

          // Clear clicked object if any
          const clickedObject = this.chronosService.getClickedObject();
          if (clickedObject !== null) {
            this.chronosService.updateClickedObject (this.chronosID, clickedObject);
          }
        }
      }
    }
  }

  toggleDynamicObjects (dynamicDirectives: any[], currentValue: boolean, previousValue: boolean): void {
    for (const oneDirectiveArray of dynamicDirectives) {
      this.toggleSingleObjects (oneDirectiveArray.objectArray, currentValue, previousValue);
    }
  }
}

// More reading:
//   https://threejs.org/docs/#api/en/core/Layers
