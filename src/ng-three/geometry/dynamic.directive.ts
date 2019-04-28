import { Directive, Input, OnChanges, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import * as THREE from 'three';

import { ChronosService } from '@ngs/core/chronos.service';

@Directive({
  selector: 'ngt-dynamic'
})
export class DynamicDirective implements OnChanges, OnInit, AfterContentInit, OnDestroy {
  @Input() offset: THREE.Vector3;
  @Input() rotation: THREE.Euler;
  @Input() scale: THREE.Vector3;
  @Input() animate: boolean;
  @Input() interact: boolean;
  @Input() content: any;

  public objectArray: THREE.Mesh[];

  constructor(
    private chronosService: ChronosService
  ) {
    this.offset = new THREE.Vector3(0, 0, 0);
    this.rotation = new THREE.Euler(0, 0, 0, 'XYZ');
    this.scale = new THREE.Vector3(1, 1, 1);
    this.animate = true;
    this.interact = false;
  }

  ngOnChanges(changes) {
    if(changes.offset && changes.offset.currentValue) {
      this.offset = changes.offset.currentValue;
      this.content.setPosition (changes.offset.currentValue);
    }
    if(changes.rotation && changes.rotation.currentValue) {
      this.rotation = changes.rotation.currentValue;
      this.content.setRotation (changes.rotation.currentValue);
    }
    if(changes.scale && changes.scale.currentValue) {
      this.scale = changes.scale.currentValue;
      this.content.setScale (changes.scale.currentValue);
    }
    if(changes.animate && changes.animate.currentValue) {
      this.animate = changes.animate.currentValue;
    }
    if(changes.interact && changes.interact.currentValue) {
      this.interact = changes.interact.currentValue;
    }
  }

  ngOnInit():void {
    this.content.setAllObjects();
    this.objectArray = this.content.objectArray;

    if (this.interact) {
      for(let element of this.objectArray) {
        this.chronosService.addToInteraction(element['object'].uuid);
      }
    }
  }

  ngAfterContentInit():void {}
  ngOnDestroy():void {}

  render(): void {
    if (this.content && this.animate) {
      this.content.render();
    }
  }
}
