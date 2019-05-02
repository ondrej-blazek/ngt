import { Directive, OnChanges, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import * as THREE from 'three';

import { ChronosService } from '@ngs/core/chronos.service';

// TODO - link this to 2D canvas layer through shared services.

@Directive({
  selector: 'ngt-projector'     // tslint:disable-line
})
export class ProjectorDirective implements OnChanges, OnInit, AfterContentInit, OnDestroy {

  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;      // <<<< Perspective ONLY??  no ortho  - TODO

  private subscription: Subscription;
  private parentID: string;
  private mouse: THREE.Vector2;
  private mouseIsActive: boolean;

  private currentObject: any;
  private currentObjectID: string;

  private objectPosition: THREE.Vector3;
  private objectProjection: THREE.Vector2;
  private elemWidth: number;
  private elemHeight: number;

  constructor (
    private chronosService: ChronosService
  ) {
    this.parentID = '';
    this.mouse = new THREE.Vector2();
    this.mouseIsActive = false;

    this.currentObject = null;
    this.currentObjectID = '';

    this.objectPosition = new THREE.Vector3();
    this.objectProjection = new THREE.Vector2();
    this.elemWidth = 0;
    this.elemHeight = 0;

    // subscribe to home component messages
    this.subscription = this.chronosService.getMessage().subscribe(
      message => {
        // if (message.type === 'mouseMove' && message.id === this.parentID) this.mouse = message.mouse;
        // if (message.type === 'mouseActive' && message.id === this.parentID) this.mouseIsActive = message.active;
        if (message.type === 'elementSize' && message.id === this.parentID) {
          this.elemWidth = message.width;
          this.elemHeight = message.height;
        }
      }
    );
  }

  ngOnChanges (changes) {}
  ngOnInit () {}
  ngAfterContentInit () {}
  ngOnDestroy (): void {}

  setScene (masterScene: THREE.Scene): void {
    this.scene = masterScene;
  }

  setCamera (masterCamera: THREE.PerspectiveCamera): void {
    this.camera = masterCamera;
  }

  renderID (passDown: string): void {
    this.parentID = passDown;
  }

  render (): void {
    // Raycast projection
    if (this.currentObject !== null) {
      // Object THREE.Vector3 position + Camera
      this.currentObject.updateMatrixWorld();
      this.objectPosition.setFromMatrixPosition(this.currentObject.matrixWorld);
      this.objectPosition.project(this.camera);

      // Screen projection THREE.Vector2
      this.objectProjection.x = ( this.objectPosition.x * (this.elemWidth / 2)) + (this.elemWidth / 2);
      this.objectProjection.y = - ( this.objectPosition.y * (this.elemHeight / 2)) + (this.elemHeight / 2);

      console.log ('object', this.currentObject.position, this.objectProjection);
    }
  }
}
