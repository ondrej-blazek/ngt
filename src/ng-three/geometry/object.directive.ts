import { Directive, Input, OnChanges, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import * as THREE from 'three';

@Directive({
  selector: 'ngt-object'
})
export class ObjectDirective implements OnChanges, OnInit, AfterContentInit, OnDestroy {
  @Input() offset: THREE.Vector3;
  @Input() rotation: THREE.Euler;
  @Input() scale: THREE.Vector3;
  @Input() animate: boolean;
  @Input() content: any;

  public object: THREE.Mesh;

  constructor() {
    this.offset = new THREE.Vector3(0, 0, 0);
    this.rotation = new THREE.Euler(0, 0, 0, 'XYZ');
    this.scale = new THREE.Vector3(1, 1, 1);
    this.animate = true;
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
  }

  ngOnInit():void {
    this.object = this.content.object;
  }

  ngAfterContentInit():void {}
  ngOnDestroy():void {}

  render(): void {
    if (this.content && this.animate) {
      this.content.render();
    }
  }
}
