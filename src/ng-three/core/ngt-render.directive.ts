import { Directive, OnInit, OnDestroy, OnChanges, AfterContentInit, Input, ContentChild, ElementRef } from '@angular/core';
import * as THREE from 'three';
import { Subscription } from 'rxjs';

import { ChronosService } from '@ngs/core/chronos.service';
import { SceneService, CameraService } from '@ngt/service';
import { SceneDirective, VisionDirective } from '@ngt/render';
import { OrbitDirective } from '@ngt/scene';

// TODO - OrbitDirective is tapping on DOM element directly with setupControls function.
//      - Look into DOM element reference provided by Scene service.

@Directive({
  selector: 'ngt-render'     // tslint:disable-line
})
export class NgtRenderDirective implements OnInit, OnDestroy, OnChanges, AfterContentInit {
  @Input() id: string;
  @Input() class: string;

  @ContentChild(SceneDirective, {static: true}) sceneDirective: SceneDirective;
  @ContentChild(VisionDirective, {static: true}) visionDirective: VisionDirective;
  @ContentChild(OrbitDirective, {static: true}) orbitDirective: OrbitDirective;

  // variables
  private scene: THREE.Scene;
  private renderer: THREE.WebGLRenderer;
  private cameraReady: boolean;
  private chronosID: string;
  private subscription: Subscription;
  private width: number;
  private height: number;

  public camera: THREE.PerspectiveCamera | THREE.OrthographicCamera;

  constructor (
    private chronosService: ChronosService,
    private sceneService: SceneService,
    private cameraService: CameraService,
    private element: ElementRef
  ) {
    this.chronosID = '';
    this.scene = null;
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      precision: 'highp'
    });
    this.cameraReady = false;

    // subscribe to home component messages
    this.subscription = this.chronosService.getMessage().subscribe(
      message => {
        if (message.type === 'elementSize' && message.id === this.chronosID ) {
          this.width = message.width;
          this.height = message.height;
          this.renderer.setSize(this.width, this.height);
        }
        if (message.type === 'setSetInitialCamera' && message.id === this.chronosID ) {
          this.fetchCamera ();
        }
      }
    );
  }

  ngOnChanges (changes) {
    const widthChange = changes.width && changes.width.currentValue;
    const heightChange = changes.height && changes.height.currentValue;
    if (widthChange || heightChange) {
      this.renderer.setSize(this.width, this.height);
    }
  }

  ngOnInit () {
    this.sceneService.setRender(this.chronosID, this.id, this.renderer);
    this.propagateID(this.chronosID, this.id);
  }

  ngAfterContentInit () {
    if (this.scene === null) {
      this.scene = this.sceneDirective.scene;
    }

    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.floor(window.devicePixelRatio));
    this.renderer.shadowMap.enabled = true;

    // This bit will append <canvas> into the directive
    const elementCatch = this.element.nativeElement.appendChild(this.renderer.domElement);
    elementCatch.setAttribute('class', this.class);
  }

  ngOnDestroy () {
    this.subscription.unsubscribe();

    this.camera.remove();
    this.render = () => {};

    this.renderer.clear();
    this.renderer.dispose();
    this.element = null;
    this.cameraReady = false;
  }

  // ---------------------------------------------------------------------------------

  fetchCamera (): void {
    if (this.scene === null) {
      this.scene = this.sceneDirective.scene;
    }

    this.camera = this.cameraService.getInitialPosition();
    this.scene.add(this.camera);

    this.visionDirective.processCamera (this.camera);
    this.cameraReady = true;

    if (this.orbitDirective) {
      this.orbitDirective.setupControls(this.camera, this.renderer);
    }
  }

  processID (chronosID: string): void {     // Executed BEFORE ngOnInit
    this.chronosID = chronosID;
    // this.propagateID(this.chronosID, this.id);    // this.id is undefined until ngOnInit
  }

  propagateID (chronosID: string, renderID: string) {
    if (this.sceneDirective) {
      this.sceneDirective.processID(chronosID, renderID);
    }
    if (this.visionDirective) {
      this.visionDirective.processID(chronosID, renderID);
    }
    if (this.orbitDirective) {
      this.orbitDirective.processID(chronosID, renderID);
    }
  }

  render (): void {
    if (this.element !== null && this.cameraReady) {
      this.renderer.render(this.scene, this.camera);
      this.propagateRender();
    }
  }

  propagateRender (): void {
    this.sceneDirective.render();
    this.visionDirective.render();
  }
}
