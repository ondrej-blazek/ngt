import { Directive, OnInit, OnDestroy, OnChanges, AfterContentInit, Input, ContentChild, ElementRef } from '@angular/core';
import * as THREE from 'three';
import { Subscription } from 'rxjs';

import { ChronosService } from '@ngs/core/chronos.service';
import { SceneService } from '@ngt/service';
import { SceneDirective, OrbitDirective, VrDirective } from '@ngt/scene';

// TODO - investigate VR mode

@Directive({
  selector: 'ngt-render'     // tslint:disable-line
})
export class NgtRenderDirective implements OnInit, OnDestroy, OnChanges, AfterContentInit {
  // element parameters
  @Input() id: string;
  @Input() class: string;

  // child components / directives
  @ContentChild(SceneDirective) sceneDirective: SceneDirective;
  @ContentChild(OrbitDirective) orbitDirective: OrbitDirective;
  // @ContentChild(VrDirective) vrDirective: VrDirective;

  get scene() {
    return this.sceneDirective.scene;
  }
  get camera() {
    return this.sceneDirective.camera;
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
    // if(changes.isVRMode && changes.isVRMode.currentValue) {
    //   if(this.vrDirective) {
    //     if(!this.vrDirective.controls) {
    //       this.vrDirective.enabled = true;
    //       this.vrDirective.setupControls(this.camera, this.renderer);
    //     }
    //     this.vrDirective.requestVR(this.renderer.domElement);
    //   }
    // }

    const widthChng = changes.width && changes.width.currentValue;
    const heightChng = changes.height && changes.height.currentValue;
    if (widthChng || heightChng) {
      this.renderer.setSize(this.width, this.height);
    }
  }

  ngOnInit () {}

  ngAfterContentInit () {
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.floor(window.devicePixelRatio));
    this.renderer.shadowMap.enabled = true;

    if (this.orbitDirective) {
      this.orbitDirective.setupControls(this.camera, this.renderer);
    }
    // if(this.vrDirective) {
    //   this.vrDirective.setupControls(this.camera, this.renderer);
    // }

    // This bit will append <canvas> into the directive
    const elCatch = this.element.nativeElement.appendChild(this.renderer.domElement);
    elCatch.setAttribute('class', this.class);
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

  processID (chronosID: string): void {
    this.chronosID = chronosID;
    this.sceneService.setRender(this.chronosID, this.id, this.renderer);

    this.propagateID(this.chronosID, this.id);
  }

  propagateID (chronosID: string, renderID: string) {
    this.sceneDirective.processID(chronosID, renderID);
    this.orbitDirective.processID(chronosID, renderID);
    // this.vrDirective.processID(chronosID, renderID);
  }

  propagateRender (): void {
    this.sceneDirective.render();
  }

  render (): void {
    if (this.element !== null) {
      this.renderer.render(this.scene, this.camera);
      this.propagateRender();
    }
  }
}
