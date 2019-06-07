import { Directive, OnInit, OnDestroy, OnChanges, AfterContentInit, Input, ContentChild, ElementRef } from '@angular/core';
import * as THREE from 'three';
import { Subscription } from 'rxjs';

import { ChronosService } from '@ngs/core/chronos.service';
import { SceneService } from '@ngt/service';
import { PerspectiveCameraDirective, OrthoCameraDirective } from '@ngt/camera';
import { SceneDirective, OrbitDirective } from '@ngt/scene';

// TODO - REMOVE all of VR mode
// TODO - remove VR directive

@Directive({
  selector: 'ngt-render'     // tslint:disable-line
})
export class NgtRenderDirective implements OnInit, OnDestroy, OnChanges, AfterContentInit {
  // element parameters
  @Input() id: string;
  @Input() class: string;

  // child components / directives
  @ContentChild(SceneDirective, {static: true}) sceneDirective: SceneDirective;
  @ContentChild(OrbitDirective, {static: true}) orbitDirective: OrbitDirective;
  @ContentChild(PerspectiveCameraDirective, {static: true}) cameraDirective: any;
  @ContentChild(OrthoCameraDirective, {static: true}) orthoDirective: any;

  get scene (): THREE.Scene {
    return (this.sceneDirective.scene);
  }

  get camera (): THREE.PerspectiveCamera | THREE.OrthographicCamera {     // Called by render directive
    let cameraValue: THREE.PerspectiveCamera | THREE.OrthographicCamera = null;
    if (this.cameraDirective) {
      cameraValue = this.cameraDirective.camera;
    }
    if (this.orthoDirective) {
      cameraValue = this.orthoDirective.camera;
    }
    return (cameraValue);
  }

  // variables
  private renderer: THREE.WebGLRenderer;
  private message: any;
  private chronosID: string;
  private subscription: Subscription;
  private width: number;
  private height: number;

  constructor (
    private chronosService: ChronosService,
    private sceneService: SceneService,
    private element: ElementRef
  ) {
    this.chronosID = '';
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      precision: 'lowp'
    });

    // subscribe to home component messages
    this.subscription = this.chronosService.getMessage().subscribe(
      message => {
        this.processMessage (message);
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
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.floor(window.devicePixelRatio));
    this.renderer.shadowMap.enabled = true;

    if (this.orbitDirective) {
      this.orbitDirective.setupControls(this.camera, this.renderer);
    }

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
  }

  // ---------------------------------------------------------------------------------

  processMessage (message: any): void {
    this.message = message;
    if (this.message.type === 'elementSize' && this.message.id === this.chronosID ) {
      this.width = this.message.width;
      this.height = this.message.height;
      this.renderer.setSize(this.width, this.height);
    }
  }

  processID (chronosID: string): void {     // Executed BEFORE ngOnInit
    this.chronosID = chronosID;
    // this.propagateID(this.chronosID, this.id);    // this.id is undefined until ngOnInit
  }

  propagateID (chronosID: string, renderID: string) {
    if (this.sceneDirective) {
      this.sceneDirective.processCamera (this.camera);
      this.sceneDirective.processID(chronosID, renderID);
    }
    if (this.orbitDirective) {
      this.orbitDirective.processID(chronosID, renderID);
    }
    if (this.cameraDirective) {
      this.cameraDirective.processID(chronosID, renderID);
    }
    if (this.orthoDirective) {
      this.orthoDirective.processID(chronosID, renderID);
    }
  }

  render (): void {
    if (this.element !== null) {
      this.renderer.render(this.scene, this.camera);
      this.propagateRender();
    }
  }

  propagateRender (): void {
    this.sceneDirective.render();
  }
}
