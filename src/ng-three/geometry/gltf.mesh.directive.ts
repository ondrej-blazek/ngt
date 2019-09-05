import { Directive, Input, OnInit, OnChanges, AfterContentInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import * as THREE from 'three';

import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { PMREMGenerator } from 'three/examples/jsm/pmrem/PMREMGenerator.js';
import { PMREMCubeUVPacker } from 'three/examples/jsm/pmrem/PMREMCubeUVPacker.js';

import { ChronosService } from '@ngs/core/chronos.service';
import { SceneService, GltfLoaderService } from '@ngt/service';

// TODO - Clean this directive up. There is too much logic that should be part of object class

@Directive({
  selector: 'ngt-gltf-mesh'     // tslint:disable-line
})
export class GltfMeshDirective implements OnInit, OnChanges, AfterContentInit, OnDestroy {
  @Input() basePath: string;
  @Input() fileName: string;
  @Input() shadows: boolean;
  @Input() envReflection: boolean;

  @Input() offset: THREE.Vector3;
  @Input() rotation: THREE.Euler;
  @Input() scale: THREE.Vector3;
  @Input() animate: boolean;
  @Input() interact: boolean;
  @Input() content: any;

  private chronosID: string;
  private renderID: string;
  private withParams: boolean;
  private meshLoader: GLTFLoader;
  private subscription: Subscription;
  private enabled: boolean;
  private scene: THREE.Scene;
  private renderStorage: THREE.WebGLRenderer;

  public objectArray: any[];

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

    this.offset = new THREE.Vector3(0, 0, 0);
    this.rotation = new THREE.Euler(0, 0, 0, 'XYZ');
    this.scale = new THREE.Vector3(1, 1, 1);
    this.animate = true;
    this.interact = false;
    this.enabled = true;

    this.withParams = true;
    this.meshLoader = new GLTFLoader();

    this.objectArray = [];

    // subscribe to home component messages
    this.subscription = this.chronosService.getMessage().subscribe(
      message => {
        if (message.type === 'setActiveObject') {
          this.userSetActiveObject(message.activeID);
        }
        if (message.type === 'clearActiveObject') {
          this.userClearActiveObject (message.activeID);
        }
        if (message.type === 'setClickedObject') {
          this.userSetClickedObject (message.clickedID);
        }
        if (message.type === 'clearClickedObject') {
          this.userClearClickedObject (message.clickedID);
        }
        if (message.type === 'activeOverlay') {
          this.enableControls (message.active);
        }
      }
    );
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

    if (changes.offset && changes.offset.currentValue) {
      this.offset = changes.offset.currentValue;
      this.content.setPosition (changes.offset.currentValue);
    }
    if (changes.rotation && changes.rotation.currentValue) {
      this.rotation = changes.rotation.currentValue;
      this.content.setRotation (changes.rotation.currentValue);
    }
    if (changes.scale && changes.scale.currentValue) {
      this.scale = changes.scale.currentValue;
      this.content.setScale (changes.scale.currentValue);
    }
    if (changes.animate && changes.animate.currentValue) {
      this.animate = changes.animate.currentValue;
    }
    if (changes.interact && changes.interact.currentValue) {
      this.interact = changes.interact.currentValue;
    }
  }

  ngOnInit(): void { }

  ngAfterContentInit(): void { }
  ngOnDestroy(): void {
    this.chronosService.resetInteraction();
    this.subscription.unsubscribe();
  }

  // ---------------------------------------------------------------------------------

  // User interaction
  userSetActiveObject (id: string): void {
    for (const element of this.objectArray) {
      if (element['object'].uuid === id && this.interact && this.enabled) {
        this.content.userSetActiveObject(element);
      }
    }
  }

  userClearActiveObject (id: string): void {
    for (const element of this.objectArray) {
      if (element['object'].uuid === id && this.interact) {
        this.content.userClearActiveObject(element);
      }
    }
  }

  userSetClickedObject (id: string): void {
    for (const element of this.objectArray) {
      if (element['object'].uuid === id && this.interact && this.enabled) {
        this.content.userSetClickedObject(element);
      }
    }
  }

  userClearClickedObject (id: string): void {
    for (const element of this.objectArray) {
      if (element['object'].uuid === id && this.interact) {
        this.content.userClearClickedObject(element);
      }
    }
  }

  enableControls (active: boolean): void {
    this.enabled = !active;
  }

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

  render (): void {
    if (this.content && this.animate) {
      this.content.render();
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
    gltf.scene.traverse((child: THREE.Object3D | THREE.Mesh | THREE.Scene) => {
      if (child.type === 'Mesh') {
        let decoratedObject = new GltfLoaderService ();
        decoratedObject.object = child;
        decoratedObject.defaultColor = child['material'].color;

        const objName = child.name;
        if (objName.includes('-interactive') && this.interact === true) {
          decoratedObject['interact'] = this.interact;
          this.chronosService.addToInteraction(child.uuid);
        }

        if (this.content) {
          this.content.objectArrayAdd (decoratedObject);
        }

        decoratedObject = null;
      }
    });

    if (this.content) {
      this.objectArray = this.content.objectArray;

      // Due to asynchronous nature of glTF this directive needs to add objects when they ready
      for (const element of this.content.objectArray) {
        this.scene.add(element['object']);
      }
    }

    // console.log ('interraction', this.chronosService.getInteraction());
    // console.log ('gltf loader - this.content.objectArray', this.content.objectArray);
  }
}
