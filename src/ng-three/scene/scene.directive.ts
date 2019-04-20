import { Directive, ContentChild, OnChanges, Input } from '@angular/core';
import * as THREE from 'three';

import { CameraDirective } from '@ngt/camera';
import { EnvironmentDirective } from './environment.directive';
import { GeometryDirective } from './geometry.directive';
import { LightDirective } from './light.directive';


@Directive({
  selector: 'ngt-scene'
})
export class SceneDirective implements OnChanges {
  // element parameters 
  @Input() helpers: boolean = false;

  // child components / directives  
  @ContentChild(CameraDirective) cameraDirective: any;
  @ContentChild(EnvironmentDirective) environmentDirective: any;
  @ContentChild(GeometryDirective) geometryDirective: any;
  @ContentChild(LightDirective) lightDirective: any;

  private parentID: string;
  private axesHelper: THREE.AxesHelper;
  private gridHelper: THREE.GridHelper;
  // private cameraHelper: THREE.CameraHelper;
 
  public scene: THREE.Scene = new THREE.Scene();

  get camera() {
    return this.cameraDirective.camera;
  }
  get environment() {
    return this.environmentDirective;
  }
  get geometry() {
    return this.geometryDirective;
  }
  get light() {
    return this.lightDirective;
  }

  constructor() {
    this.parentID = '';
  }
  
  ngOnChanges(changes) {
    if(changes.helpers) {
      this.helpers = changes.helpers.currentValue;

      if (this.axesHelper) this.axesHelper.visible = this.helpers;
      if (this.gridHelper) this.gridHelper.visible = this.helpers;
      // if (this.cameraHelper) this.cameraHelper.visible = this.helpers;
    }
  }

  ngOnInit() {
    // Pass this scene handler to geometry directive
    if (this.environmentDirective) this.environmentDirective.setScene(this.scene);
    if (this.geometryDirective) this.geometryDirective.setScene(this.scene);
    if (this.lightDirective) this.lightDirective.setScene(this.scene);
  }

  ngOnDestroy():void {
    this.scene.remove();
  }

  ngAfterContentInit() {
    // Scene
    this.scene.background = new THREE.Color().setHSL( 0.6, 0, 1 );
    this.scene.fog = new THREE.Fog( 0xffffff, 1, 1000 );

    // Camera
    this.camera.lookAt(this.scene.position);
    this.scene.add(this.camera);

    // this.cameraHelper = new THREE.CameraHelper( this.camera );
    // this.cameraHelper.visible = this.helpers;
    // this.scene.add( this.cameraHelper );

    // ThreeJS Helper objects
    this.axesHelper = new THREE.AxesHelper(200);
    this.axesHelper.visible = this.helpers;
    this.scene.add (this.axesHelper);

    this.gridHelper = new THREE.GridHelper(1200, 60);
    this.gridHelper.visible = this.helpers;
    this.scene.add (this.gridHelper);
  }

  renderID(passDown: string): void {
    this.parentID = passDown;
    this.propagateID (passDown);
  }

  propagateID(passDown: string) {
    this.cameraDirective.renderID(passDown);
    this.environmentDirective.renderID(passDown);
    this.geometryDirective.renderID(passDown);
    this.lightDirective.renderID(passDown);
  }

  propagateRender (): void {
    this.geometryDirective.render();
    this.lightDirective.render();
  }

  render(): void {
    this.propagateRender ();
  }
}
