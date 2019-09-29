import { Directive, Input, OnInit, OnChanges, AfterContentInit, OnDestroy } from '@angular/core';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

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
  private scene: THREE.Scene;
  private renderStorage: THREE.WebGLRenderer;

  constructor(
    private sceneService: SceneService,
    private cameraService: CameraService,
    private chronosService: ChronosService
  ) {
    this.chronosID = '';
    this.renderID = '';
    this.withParams = true;         // TODO - Proper @input validation is required.
    this.cameraLoader = new GLTFLoader();
  }

  ngOnChanges (changes) {}
  ngOnInit () {}
  ngAfterContentInit (): void {}
  ngOnDestroy (): void {}

  // ---------------------------------------------------------------------------------

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
        const camPosition: THREE.PerspectiveCamera | THREE.OrthographicCamera | THREE.Object3D = child;
        const camParent: THREE.Object3D = camPosition.parent;

        this.cameraService.addCamera(camParent);
        this.scene.add(camParent);
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
