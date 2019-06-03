import { Directive, Input, OnInit, OnChanges, AfterContentInit } from '@angular/core';
import * as THREE from 'three';

import { SceneService } from '@ngt/service';

@Directive({
  selector: 'ngt-panorama'     // tslint:disable-line
})
export class CubePanoramaDirective implements OnInit, OnChanges, AfterContentInit {
  @Input() basePath: string;
  @Input() imageArray: string[];

  private withParams: boolean;
  private scene: THREE.Scene;
  private chronosID: string;
  private renderID: string;
  private cubeTextureLoader: THREE.CubeTextureLoader;
  public texture: THREE.CubeTexture;

  constructor(
    private sceneService: SceneService
  ) {
    this.basePath = '';
    this.imageArray = [];
    this.withParams = true;

    this.chronosID = '';
    this.renderID = '';

    this.texture = new THREE.CubeTexture();
    this.cubeTextureLoader = new THREE.CubeTextureLoader();
  }

  ngOnChanges (changes) {
    if (changes.basePath) {
      this.basePath = changes.basePath.currentValue;
    }
    if (changes.imageArray) {
      this.imageArray = changes.imageArray.currentValue;
    }

    if ((changes.basePath || changes.imageArray) && this.scene) {
      this.updateScene(this.basePath, this.imageArray);
    }
  }

  ngOnInit () {
    this.scene = this.sceneService.getScene(this.chronosID, this.renderID);

    if (this.withParams) {
      this.updateScene(this.basePath, this.imageArray);
    }
  }
  ngAfterContentInit () {}

  // ---------------------------------------------------------------------------------

  processID (chronosID: string, renderID: string): void {
    this.chronosID = chronosID;
    this.renderID = renderID;
  }

  updateScene (basePath: string, imageArray: string[]): void {
    this.withParams = false;

    this.cubeTextureLoader.setPath(basePath);
    this.cubeTextureLoader.load(imageArray, (texture: THREE.CubeTexture) => {
      this.texture = texture;
      this.scene.background = this.texture;
    });
  }
}
