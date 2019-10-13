import { Directive, Input, OnInit, OnChanges, AfterContentInit, OnDestroy } from '@angular/core';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { Subscription } from 'rxjs';
import * as THREE from 'three';

import { CameraService, SceneService } from '@ngt/service';
import { ChronosService } from '@ngs/core/chronos.service';

@Directive({
  selector: 'ngt-camera-gltf-data'     // tslint:disable-line
})
export class GltfCameraDataDirective implements OnInit, OnChanges, AfterContentInit, OnDestroy {
  // element parameters
  @Input() basePath: string;
  @Input() fileName: string;
  @Input() useDefaultPosition: boolean;

  private chronosID: string;
  private renderID: string;

  private withParams: boolean;
  private cameraLoader: GLTFLoader;
  private cameraArray: THREE.PerspectiveCamera[];
  private scene: THREE.Scene;
  private renderStorage: THREE.WebGLRenderer;

  private subscription: Subscription;
  private width: number;
  private height: number;

  constructor(
    private sceneService: SceneService,
    private cameraService: CameraService,
    private chronosService: ChronosService
  ) {
    this.chronosID = '';
    this.renderID = '';
    this.withParams = true;         // TODO - Proper @input validation is required.
    this.cameraLoader = new GLTFLoader();
    this.cameraArray = [];

    // subscribe to home component messages
    this.subscription = this.chronosService.getMessage().subscribe(
      message => {
        if (message.type === 'elementSize' && message.id === this.chronosID) {
          this.width = message.width;
          this.height = message.height;
          this.updateAspect(this.width / this.height);
        }
        if (message.type === 'enableLayer' && message.id === this.chronosID) {
          this.enableLayerFn (message.layerNo);
        }
        if (message.type === 'toggleLayer' && message.id === this.chronosID) {
          this.toggleLayerFn (message.layerNo);
        }
        if (message.type === 'disableLayer' && message.id === this.chronosID) {
          this.disableLayerFn (message.layerNo);
        }
      }
    );
  }

  ngOnChanges (changes) {}
  ngOnInit () {}
  ngAfterContentInit (): void {}
  ngOnDestroy (): void {}

  // ---------------------------------------------------------------------------------

  updateAspect (ratio: number): void {
    for (const cam of this.cameraArray) {
      cam.aspect = ratio;
      cam.updateProjectionMatrix();
    }
  }
  enableLayerFn (layerNo: number): void {
    for (const cam of this.cameraArray) {
      cam.layers.enable(layerNo);
    }
  }
  toggleLayerFn (layerNo: number): void {
    for (const cam of this.cameraArray) {
      cam.layers.toggle(layerNo);
    }
  }
  disableLayerFn (layerNo: number): void {
    for (const cam of this.cameraArray) {
      cam.layers.disable(layerNo);
    }
  }

  processID (chronosID: string, renderID: string): void {
    this.chronosID = chronosID;
    this.renderID = renderID;

    this.executeLogic();
  }

  executeLogic(): void {
    this.renderStorage = this.sceneService.getRender(this.chronosID, this.renderID);
    this.scene = this.sceneService.getScene(this.chronosID, this.renderID);

    if (this.withParams) {
      this.updateScene(this.basePath, this.fileName);
    }
  }

  updateScene(basePath: string, fileName: string): void {
    this.withParams = false;

    this.cameraLoader.setPath(basePath);
    this.cameraLoader.load(fileName, (gltf: GLTF) => {
      this.modeLights(gltf);
    },
    (xhr: ProgressEvent) => {
      // console.info( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    (error: ErrorEvent) => {
      // console.error( 'An error happened', error );
    });
  }

  // Parse after load and set interactive objects
  modeLights(gltf: GLTF): void {
    // Collect array of all camera IDs
    if (gltf.cameras.length > 0) {
      for (const child of gltf.cameras) {
        // create blank camera
        const viewAngle = 75;
        const near = 0.1;
        const far = 10000;
        const aspect = this.width / this.height;

        // Assume data from glTF import
        const sceneCam = new THREE.PerspectiveCamera(viewAngle, aspect, near, far);
        sceneCam.castShadow = child.castShadow;
        sceneCam.filmGauge = 35;
        sceneCam.filmOffset = 0;

        // TODO - investigate more options to be assumed from child data source.  Like FOV

        // Assume date from transform object onto camera
        const transformObject: THREE.Object3D = child.parent;
        sceneCam.position.set(transformObject.position.x, transformObject.position.y, transformObject.position.z);
        sceneCam.rotation.set(transformObject.rotation.x, transformObject.rotation.y, transformObject.rotation.z, transformObject.rotation.order);  // tslint:disable-line
        sceneCam.scale.set(transformObject.scale.x, transformObject.scale.y, transformObject.scale.z);
        sceneCam.quaternion.set(transformObject.quaternion.x, transformObject.quaternion.y, transformObject.quaternion.z, transformObject.quaternion.w);  // tslint:disable-line
        sceneCam.up.set(transformObject.up.x, transformObject.up.y, transformObject.up.z);

        this.cameraArray.push(sceneCam);
        this.cameraService.addCamera(sceneCam);
        this.scene.add(sceneCam);
      }
    }

    // Special camera case (Default camera in the scene)
    if (gltf.scene.children.length > 0) {
      const specialCase: THREE.Object3D = gltf.scene.children[0];
      if (specialCase.children.length === 0 && specialCase.name.toLowerCase().includes('camera') && specialCase.type === 'Object3D') {
        this.cameraService.setDefaultPosition(gltf.scene.children[0]);
        this.chronosService.setSetDefaultCameraPosition(this.chronosID);
        this.chronosService.updateOrbitControls(this.chronosID);
      }
    }
  }
}
