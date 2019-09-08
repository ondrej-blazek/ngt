import { Directive, Input, OnInit, OnChanges, AfterContentInit, OnDestroy } from '@angular/core';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

import { ChronosService } from '@ngs/core/chronos.service';
import { SceneService } from '@ngt/service';

@Directive({
  selector: 'ngt-light-gltf'     // tslint:disable-line
})
export class GltfLightDirective implements OnInit, OnChanges, AfterContentInit, OnDestroy {
  // element parameters
  @Input() basePath: string;
  @Input() fileName: string;
  @Input() content: any;

  private chronosID: string;
  private renderID: string;
  private withParams: boolean;
  private lightLoader: GLTFLoader;
  private lightArray: THREE.Object3D[];
  private scene: THREE.Scene;
  private renderStorage: THREE.WebGLRenderer;

  constructor(
    private sceneService: SceneService,
    private chronosService: ChronosService
  ) {
    this.chronosID = '';
    this.renderID = '';
    this.withParams = true;
    this.lightLoader = new GLTFLoader();
    this.lightArray = [];
  }

  ngOnChanges (changes) {}
  ngOnInit () {}
  ngAfterContentInit (): void {}
  ngOnDestroy (): void {}

  render (): void {
    // if (this.content && this.animate) {
    //   this.light = this.content.render(this.light);
    // }
  }

  processID (chronosID: string, renderID: string): void {
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

  updateScene(basePath: string, fileName: string): void {
    this.withParams = false;

    this.lightLoader.setPath(basePath);
    this.lightLoader.load(fileName, (gltf: GLTF) => {
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

    // console.log ('gltf', gltf);

    gltf.scene.traverse((child: THREE.Object3D | THREE.Mesh | THREE.Scene) => {
      if (child.type === 'Object3D' && child.children.length === 1) {
        this.lightArray.push(child);
      }

      // TODO - GET ALL THE OTHER Light types
    });

    if (this.lightArray.length > 0) {
      for (const element of this.lightArray) {
        this.scene.add(element);

        const light: any = element.children[0];
        const lightHelper = new THREE.SpotLightHelper(light);
        this.scene.add(lightHelper);
      }
    }

    // console.log ('interraction', this.chronosService.getInteraction());
    // console.log ('gltf loader - this.content.objectArray', this.content.objectArray);
  }

}
