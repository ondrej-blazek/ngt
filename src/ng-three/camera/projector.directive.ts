import { Directive, OnChanges, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import * as THREE from 'three';

import { ChronosService } from '@ngs/core/chronos.service';

@Directive({
  selector: 'ngt-projector'     // tslint:disable-line
})
export class ProjectorDirective implements OnChanges, OnInit, AfterContentInit, OnDestroy {

  private camera: THREE.PerspectiveCamera | THREE.OrthographicCamera;

  private subscription: Subscription;
  private chronosID: string;
  private renderID: string;

  private elemWidth: number;
  private elemHeight: number;

  private activeObject: any;
  private activeObjectID: string;
  private activeObjectPosition: THREE.Vector3;
  private activeObjectProjection: THREE.Vector2;

  private clickedObject: any;
  private clickedObjectID: string;
  private clickedObjectPosition: THREE.Vector3;
  private clickedObjectProjection: THREE.Vector2;


  constructor (
    private chronosService: ChronosService
  ) {
    this.chronosID = '';
    this.renderID = '';
    this.elemWidth = 0;
    this.elemHeight = 0;

    this.activeObject = null;
    this.activeObjectID = '';
    this.activeObjectPosition = new THREE.Vector3();
    this.activeObjectProjection = new THREE.Vector2();

    this.clickedObject = null;
    this.clickedObjectID = '';
    this.clickedObjectPosition = new THREE.Vector3();
    this.clickedObjectProjection = new THREE.Vector2();

    // subscribe to home component messages
    this.subscription = this.chronosService.getMessage().subscribe(
      message => {
        if (message.type === 'elementSize' && message.id === this.chronosID) {
          this.elemWidth = message.width;
          this.elemHeight = message.height;
        }
        if (message.type === 'setActiveObject' && message.id === this.chronosID) {
          this.activeObject = this.chronosService.getActiveObject();
        }
        if (message.type === 'clearActiveObject' && message.id === this.chronosID) {
          this.activeObject = null;
        }
        if (message.type === 'setClickedObject' && message.id === this.chronosID) {
          this.clickedObject = this.chronosService.getClickedObject();
        }
        if (message.type === 'clearClickedObject' && message.id === this.chronosID) {
          this.clickedObject = null;
        }
      }
    );
  }

  ngOnChanges (changes) {}
  ngOnInit () {}
  ngAfterContentInit () {}
  ngOnDestroy () {
    this.subscription.unsubscribe();
  }

  // ---------------------------------------------------------------------------------

  setCamera (masterCamera: THREE.PerspectiveCamera | THREE.OrthographicCamera): void {
    this.camera = masterCamera;
  }

  processID (chronosID: string, renderID: string): void {
    this.chronosID = chronosID;
    this.renderID = renderID;
  }

  render (): void {
    if (this.activeObject !== null) {
      this.activeObjectProjection = this.raycastProjection (this.activeObject, this.activeObjectPosition);
      this.chronosService.activeProjection (this.chronosID, this.activeObjectProjection);     // <<< Make Chronos service broadcast this
    }
    if (this.clickedObject !== null) {
      this.clickedObjectProjection = this.raycastProjection (this.clickedObject, this.clickedObjectPosition);
      this.chronosService.clickedProjection (this.chronosID, this.clickedObjectProjection);   // <<< Make Chronos service broadcast this
    }
  }

  raycastProjection (objectToProject: any, objectPosition: THREE.Vector3): THREE.Vector2 {
    // Object THREE.Vector3 position + Camera
    objectToProject.updateMatrixWorld();
    objectPosition.setFromMatrixPosition(objectToProject.matrixWorld);
    objectPosition.project(this.camera);

    // Screen projection THREE.Vector2
    const projectionPosition: THREE.Vector2 = new THREE.Vector2();
    projectionPosition.x = ( objectPosition.x * (this.elemWidth / 2)) + (this.elemWidth / 2);
    projectionPosition.y = - ( objectPosition.y * (this.elemHeight / 2)) + (this.elemHeight / 2);
    return (projectionPosition);
  }
}
