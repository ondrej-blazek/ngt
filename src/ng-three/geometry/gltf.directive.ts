import { Directive, Input, OnInit, OnChanges, AfterContentInit, OnDestroy } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

@Directive({
  selector: 'ngt-gltf'     // tslint:disable-line
})
export class GltfDirective implements OnInit, OnChanges, AfterContentInit, OnDestroy {
  @Input() basePath: string;
  @Input() fileName: string;

  private withParams: boolean;
  private meshLoader: GLTFLoader;
  private scene: THREE.Scene;
  private mixer: THREE.AnimationMixer;

  constructor() {
    this.basePath = '';
    this.fileName = '';
    this.withParams = true;

    this.meshLoader = new GLTFLoader();
  }


  ngOnChanges (changes) {
    if (changes.basePath) {
      this.basePath = changes.basePath.currentValue;
    }
    if (changes.fileName) {
      this.fileName = changes.fileName.currentValue;
    }

    if (changes.basePath || changes.imageArray) {
      this.updateScene(this.basePath, this.fileName);
    }
  }

  ngOnInit (): void {
    if (this.withParams) {
      this.updateScene(this.basePath, this.fileName);
    }
  }
  ngAfterContentInit (): void {}
  ngOnDestroy (): void {}

  render (): void {
    if (this.mixer) {
      this.mixer.update(0.01666666666666666);
    }
  }

  setScene (masterScene: THREE.Scene): void {
    this.scene = masterScene;
  }

  updateScene (basePath: string, fileName: string): void {
    this.withParams = false;

    this.meshLoader.setPath(basePath);
    this.meshLoader.load(fileName, (gltf: GLTF) => {
      this.scene.add(gltf.scene);
      this.mixer = new THREE.AnimationMixer(gltf.scene);
      gltf.animations.forEach((clip) => {
        this.mixer.clipAction(clip).play();
      });
    },
    (xhr: ProgressEvent) => {
      // console.info( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    (error: ErrorEvent) => {
      // console.error( 'An error happened', error );
    });
  }
}


// More info:
//    https://threejs.org/docs/index.html#examples/loaders/GLTFLoader
//    https://threejs.org/examples/?q=glt#webgl2_loader_gltf
//    https://github.com/mrdoob/three.js/blob/master/examples/webgl2_loader_gltf.html
//    https://github.com/khronosgroup/gltf#gltf-tools
