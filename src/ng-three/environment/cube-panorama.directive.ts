import { Directive, Input, OnInit, OnChanges, AfterContentInit } from '@angular/core';
import * as THREE from 'three';

@Directive({
  selector: 'ngt-panorama'     // tslint:disable-line
})
export class CubePanoramaDirective implements OnInit, OnChanges, AfterContentInit {
  @Input() basePath: string;
  @Input() imageArray: string[];

  private withParams: boolean;
  private scene: THREE.Scene;
  private cubeTextureLoader: THREE.CubeTextureLoader;
  public texture: THREE.CubeTexture;

  constructor() {
    this.basePath = '';
    this.imageArray = [];
    this.withParams = true;

    this.texture = new THREE.CubeTexture();
    this.cubeTextureLoader = new THREE.CubeTextureLoader();
  }

  ngOnChanges (changes) {
    if (changes.imageArray) {
      this.imageArray = changes.imageArray.currentValue;
      this.updateScene(this.basePath, this.imageArray);
    }
  }

  ngOnInit () {
    if (this.withParams) {
      this.updateScene(this.basePath, this.imageArray);
    }
  }
  ngAfterContentInit () {}


  setScene (masterScene: THREE.Scene): void {
    this.scene = masterScene;
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
