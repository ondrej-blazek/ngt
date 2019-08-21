import { Directive, Input, OnInit, OnChanges, AfterContentInit, OnDestroy } from '@angular/core';
import * as THREE from 'three';

import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { PMREMGenerator } from 'three/examples/jsm/pmrem/PMREMGenerator.js';
import { PMREMCubeUVPacker } from 'three/examples/jsm/pmrem/PMREMCubeUVPacker.js';

import { ChronosService } from '@ngs/core/chronos.service';
import { SceneService } from '@ngt/service';

// TODO - Clean this directive up. There is too much logic that should be part of object class

@Directive({
  selector: 'ngt-gltf-mesh'     // tslint:disable-line
})
export class GltfMeshDirective implements OnInit, OnChanges, AfterContentInit, OnDestroy {
  @Input() basePath: string;
  @Input() fileName: string;
  @Input() shadows: boolean;
  @Input() envReflection: boolean;

  private chronosID: string;
  private renderID: string;
  private withParams: boolean;
  private meshLoader: GLTFLoader;

  private scene: THREE.Scene;
  private mixer: THREE.AnimationMixer;
  private renderStorage: THREE.WebGLRenderer;

  constructor(
    private sceneService: SceneService,
    private chronosService: ChronosService
  ) {
    this.chronosID = '';
    this.renderID = '';
    this.basePath = '';
    this.fileName = '';
    this.shadows = true;
    this.envReflection = true;
    this.withParams = true;

    this.meshLoader = new GLTFLoader();
  }

  ngOnChanges(changes) {
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

  ngOnInit(): void { }
  ngAfterContentInit(): void { }
  ngOnDestroy(): void { }

  // ---------------------------------------------------------------------------------

  processID(chronosID: string, renderID: string): void {     // Executed AFTER ngAfterContentInit -> staring point
    this.chronosID = chronosID;
    this.renderID = renderID;

    this.executeLogic();
  }

  executeLogic(): void {
    this.renderStorage = this.sceneService.getRender(this.chronosID, this.renderID);
    this.scene = this.sceneService.getScene(this.chronosID, this.renderID);

    // ngOnInit
    if (this.withParams) {
      this.updateScene(this.basePath, this.fileName);
    }
  }

  render(): void {
    if (this.mixer) {
      this.mixer.update(1 / 60);
    }
  }

  updateScene(basePath: string, fileName: string): void {
    this.withParams = false;

    this.meshLoader.setPath(basePath);
    this.meshLoader.load(fileName, (gltf: GLTF) => {
      this.sceneOptions(gltf);
      this.modeMesh(gltf);
    },
    (xhr: ProgressEvent) => {
      // console.info( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    (error: ErrorEvent) => {
      // console.error( 'An error happened', error );
    });
  }

  // Environment options - global reflections, shadows
  sceneOptions(gltf: GLTF): void {
    let textureBackground = null;

    // Cube background reflection mapping
    if (typeof (this.scene.background) === 'object') {   // type of THREE.CubeTexture
      textureBackground = this.scene.background;

      const pmremGenerator = new PMREMGenerator(textureBackground);
      pmremGenerator.update(this.renderStorage);

      const pmremCubeUVPacker = new PMREMCubeUVPacker(pmremGenerator.cubeLods);
      pmremCubeUVPacker.update(this.renderStorage);

      const envMap = pmremCubeUVPacker.CubeUVRenderTarget.texture;

      gltf.scene.traverse((child: any) => {
        if (child.type === 'Mesh') {
          // reflect cube panorama
          if (this.envReflection) {
            child.material.envMap = envMap;
          }
          // casts and receive shadows
          if (this.shadows) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        }
      });
    }
  }

  // Parse after load and set interactive objects
  modeMesh(gltf: GLTF): void {
    gltf.scene.traverse((child: any) => {
      if (child.type === 'Mesh') {
        console.log('child.name', child.name);

        const objName = child.name;
        const hasIt = objName.includes('-interactive');

        if (hasIt) {
          this.chronosService.addToInteraction(child.uuid);
        }

        this.scene.add(child);
      }
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
