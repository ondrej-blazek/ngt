import { Directive, OnInit, OnDestroy, OnChanges, AfterContentInit, Input, ContentChild, ElementRef } from '@angular/core';
import * as THREE from 'three';
import { Subscription } from 'rxjs';

import { ChronosService } from '@ngs/core/chronos.service';
import { SceneDirective, OrbitDirective, VrDirective } from '@ngt/scene';

@Directive({
  selector: 'ngt-render'     // tslint:disable-line
})
export class NgtRenderDirective implements OnInit, OnDestroy, OnChanges, AfterContentInit {
  // element parameters
  @Input() id: string;

  // child components / directives
  @ContentChild(SceneDirective) sceneDirective: SceneDirective;
  @ContentChild(OrbitDirective) orbitDirective: OrbitDirective;
  @ContentChild(VrDirective) vrDirective: VrDirective;

  get scene() {
    return this.sceneDirective.scene;
  }
  get camera() {
    return this.sceneDirective.camera;
  }

  // variables
  private renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
    antialias: true,
    precision: 'lowp'
  });

  private message: any;
  private parentID: string;
  private subscription: Subscription;
  private width: number;
  private height: number;

  constructor(
    private chronosService: ChronosService,
    private element: ElementRef
  ) {
    this.parentID = '';

    // subscribe to home component messages
    this.subscription = this.chronosService.getMessage().subscribe(
      message => {
        this.processMessage (message);
      }
    );
  }

  ngOnInit() {
    // console.log ('NgtRenderDirective - ngOnInit', this.width, this.height);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();

    this.camera.remove();
    this.render = () => {};

    cancelAnimationFrame(0);
    this.renderer.clear();
    this.renderer.dispose();
    this.element = null;
  }


  ngOnChanges(changes) {
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
    if(widthChng || heightChng) {
      this.renderer.setSize(this.width, this.height);
    }
  }

  ngAfterContentInit() {
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.floor(window.devicePixelRatio));
    this.renderer.shadowMap.enabled = true;

    if(this.orbitDirective) {
      this.orbitDirective.setupControls(this.camera, this.renderer);
    }
    // if(this.vrDirective) {
    //   this.vrDirective.setupControls(this.camera, this.renderer);
    // }

    // This bit will append <canvas> into the directive
    const elCatch = this.element.nativeElement.appendChild(this.renderer.domElement);
    elCatch.setAttribute('class', 'webgl');
  }

  processMessage (message: any):void {
    this.message = message;
    if (this.message.type === 'elementSize' && this.message.id === this.parentID ) {
      this.width = this.message.width;
      this.height = this.message.height;
      this.renderer.setSize(this.width, this.height);
    }
  }

  renderID(passDown: string): void {
    this.parentID = passDown;
    this.propagateID(passDown);
  }

  propagateID(passDown: string) {
    this.sceneDirective.renderID(passDown);
    this.orbitDirective.renderID(passDown);
    this.vrDirective.renderID(passDown);
  }
  
  render(): void {
    if (this.element !== null) {
      this.renderer.render(this.scene, this.camera);
    }
  }
}
