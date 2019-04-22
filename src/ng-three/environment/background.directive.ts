import { Directive, Input, OnInit, OnChanges, AfterContentInit } from '@angular/core';
import * as THREE from 'three';

@Directive({
  selector: 'ngt-background'
})
export class BackgroundDirective implements OnInit, OnChanges, AfterContentInit {
  @Input() color: THREE.Color;

  private scene: THREE.Scene;

  constructor() {
    this.color = new THREE.Color(0xffffff);
  }

  ngOnChanges(changes) {
    if(changes.color) {
      this.color = changes.color.currentValue;
      this.updateScene(this.color);
    }
  }

  ngOnInit () {
    this.updateScene(this.color);
  }
  ngAfterContentInit() {}

  setScene (masterScene:THREE.Scene):void {
    this.scene = masterScene;
  }
  updateScene (color:THREE.Color):void {
    this.scene.background = new THREE.Color(this.color);
  }
}
