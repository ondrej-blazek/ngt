import { Directive, Input, OnInit, OnChanges, AfterContentInit } from '@angular/core';
import * as THREE from 'three';

import { SceneService } from '@ngt/service';

@Directive({
  selector: 'ngt-background'     // tslint:disable-line
})
export class BackgroundDirective implements OnInit, OnChanges, AfterContentInit {
  @Input() color: THREE.Color;

  private scene: THREE.Scene;
  private chronosID: string;
  private renderID: string;

  constructor (
    private sceneService: SceneService
  ) {
    this.chronosID = '';
    this.renderID = '';
    this.color = new THREE.Color(0xffffff);
  }

  ngOnChanges (changes) {
    if (changes.color && this.scene) {
      this.color = changes.color.currentValue;
      this.updateScene(this.color);
    }
  }

  ngOnInit () {
    this.scene = this.sceneService.getScene(this.chronosID, this.renderID);
    this.updateScene(this.color);
  }
  ngAfterContentInit () {}

  // ---------------------------------------------------------------------------------

  processID (chronosID: string, renderID: string): void {
    this.chronosID = chronosID;
    this.renderID = renderID;
  }

  updateScene (color: THREE.Color): void {
    this.scene.background = new THREE.Color(color);
  }
}
