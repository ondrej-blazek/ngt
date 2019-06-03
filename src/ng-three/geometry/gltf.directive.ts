import { Directive, Input, OnInit, OnChanges, AfterContentInit, OnDestroy } from '@angular/core';
import * as THREE from 'three';

import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { PMREMGenerator } from 'three/examples/jsm/pmrem/PMREMGenerator.js';
import { PMREMCubeUVPacker } from 'three/examples/jsm/pmrem/PMREMCubeUVPacker.js';

import { SceneService } from '@ngt/service';

// TODO - Clean this directive up. There is too much logic that should be part of object class

@Directive({
  selector: 'ngt-gltf'     // tslint:disable-line
})
export class GltfDirective implements OnInit, OnChanges, AfterContentInit, OnDestroy {
  @Input() basePath: string;
  @Input() fileName: string;

  private chronosID: string;
  private renderID: string;
  private withParams: boolean;
  private meshLoader: GLTFLoader;

  private scene: THREE.Scene;
  private mixer: THREE.AnimationMixer;
  private renderStorage: THREE.WebGLRenderer;

  constructor(
    private sceneService: SceneService
  ) {
    this.chronosID = '';
    this.renderID = '';
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

  ngOnInit (): void {}
  ngAfterContentInit (): void {}
  ngOnDestroy (): void {}

  // ---------------------------------------------------------------------------------

  processID (chronosID: string, renderID: string): void {     // Executed AFTER ngAfterContentInit -> staring point
    this.chronosID = chronosID;
    this.renderID = renderID;

    this.executeLogic ();
  }

  executeLogic (): void {
    this.renderStorage = this.sceneService.getRender(this.chronosID, this.renderID);
    this.scene = this.sceneService.getScene(this.chronosID, this.renderID);

    // ngOnInit
    if (this.withParams) {
      this.updateScene(this.basePath, this.fileName);
    }
  }

  render (): void {
    if (this.mixer) {
      this.mixer.update(0.01666666666666666);
    }
  }

  updateScene (basePath: string, fileName: string): void {
    this.withParams = false;

    this.meshLoader.setPath(basePath);
    this.meshLoader.load(fileName, (gltf: GLTF) => {
      let textureBackground = null;
      if (typeof(this.scene.background) === 'object') {   // type of THREE.CubeTexture
        textureBackground = this.scene.background;

        const pmremGenerator = new PMREMGenerator( textureBackground );
        pmremGenerator.update( this.renderStorage );

        const pmremCubeUVPacker = new PMREMCubeUVPacker( pmremGenerator.cubeLods );
        pmremCubeUVPacker.update( this.renderStorage );

        const envMap = pmremCubeUVPacker.CubeUVRenderTarget.texture;

        gltf.scene.traverse(( child: any ) => {
          if (child.type === 'Mesh') {
            child.material.envMap = envMap;
          }
        });
      }

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

// Model Sources
//    https://github.com/KhronosGroup/glTF-Sample-Models/tree/master/2.0
//    https://github.com/KhronosGroup/glTF-Sample-Models/tree/master/2.0/DamagedHelmet
//    https://github.com/KhronosGroup/glTF-Sample-Models/tree/master/2.0/BoomBox
