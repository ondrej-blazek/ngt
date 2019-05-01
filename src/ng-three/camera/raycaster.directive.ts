import { Directive, OnChanges, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import * as THREE from 'three';

import { ChronosService } from '@ngs/core/chronos.service';

// TODO - Look into all 'any' objects and definitions to see if they can be made more specific.
// TODO - Objects also have the ability to react to raycaster - investigate some more.

@Directive({
  selector: 'ngt-raycaster'
})
export class RaycasterDirective implements OnChanges, OnInit, AfterContentInit, OnDestroy {

  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;      // <<<< Perspective ONLY??  no ortho  - TODO

  private subscription: Subscription;
  private parentID: string;
  private rayCaster: THREE.Raycaster;
  private mouse: THREE.Vector2;
  private mouseIsActive: boolean;

  private currentObject: any;
  private currentObjectID: string;
  private previousObject: any;
  private previousObjectID: string;
  private interactionArray: Array<string>;

  // private objectPosition: THREE.Vector3;
  // private objectProjection: THREE.Vector2;
  // private elemWidth: number;
  // private elemHeight: number;

  constructor(
    private chronosService: ChronosService
  ) {
    this.parentID = '';
    this.rayCaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.mouseIsActive = false;

    this.currentObject = null;
    this.currentObjectID = '';
    this.previousObject = null;
    this.previousObjectID = '';
    this.interactionArray = [];

    // this.objectPosition = new THREE.Vector3();
    // this.objectProjection = new THREE.Vector2();
    // this.elemWidth = 0;
    // this.elemHeight = 0;

    // subscribe to home component messages
    this.subscription = this.chronosService.getMessage().subscribe(
      message => {
        if (message.type === 'mouseMove' && message.id === this.parentID) this.mouse = message.mouse;
        if (message.type === 'mouseActive' && message.id === this.parentID) this.mouseIsActive = message.active;
        // if (message.type === 'elementSize' && message.id === this.parentID) {
        //   this.elemWidth = message.width;
        //   this.elemHeight = message.height;
        // }
      }
    );
  }

  ngOnChanges(changes) {}
  ngOnInit() {}
  ngAfterContentInit() {
    // TODO - this.interactionArray has to be able to update on runtime to reflect dynamic changes to the array.
    this.interactionArray = this.chronosService.getInteraction ();
  }
  ngOnDestroy():void {}

  setScene (masterScene:THREE.Scene):void {
    this.scene = masterScene;
  }

  setCamera (masterCamera:THREE.PerspectiveCamera):void {
    this.camera = masterCamera;
  }

  renderID(passDown: string): void {
    this.parentID = passDown;
  }

  setActiveObject (oneObject:any):void {
    if (!oneObject.currentHex || oneObject.currentHex === null) oneObject.currentHex = oneObject.material.color.getHex();
    oneObject.material.color.setHex( 0xff0000 );

    this.chronosService.setActiveObject (oneObject);
  }

  clearActiveObject (oneObject:any):void {
    oneObject.material.color.setHex( oneObject.currentHex );
    oneObject.currentHex = null;

    this.previousObject = null;
    this.previousObjectID = '';

    this.chronosService.clearActiveObject ();
  }

  render(): void {
    if (this.mouseIsActive) {
      this.rayCaster.setFromCamera( this.mouse, this.camera );
      let intersects: Array<any> = this.rayCaster.intersectObjects( this.scene.children );

      try {
        if (intersects.length > 0) {
          // for(let element of intersects) {}
          let firstIntersect = intersects[0].object;
          let interactionCheck:Array<string> = this.interactionArray.filter((item, i, ar) => ( item === firstIntersect.uuid ));

          // Continuous (every frame) check
          if (interactionCheck.length === 0) {
            // Excluded objects
            this.currentObject = null;
            this.currentObjectID = '';
          } else {
            // Objects are allowed
            this.previousObject = this.currentObject;
            this.previousObjectID = this.currentObjectID;

            this.currentObject = firstIntersect;
            this.currentObjectID = firstIntersect.uuid;
          }

          // One time even reactions
          if (this.currentObjectID !== '' && this.previousObjectID !== this.currentObjectID) {
            if (this.previousObjectID !== '') {
              this.clearActiveObject (this.previousObject);
              this.setActiveObject (this.currentObject);
            } else {
              this.setActiveObject (this.currentObject);
            }
          } else {
            if (this.previousObjectID !== '' && this.previousObjectID !== this.currentObjectID){
              this.clearActiveObject (this.previousObject);
            }
          }
        } else {
          // No intersects (array is empty, now what....)
        }
      } catch (e) {
        // TODO - better handling of failures.
      }


      // // Raycast projection
      // if (this.currentObject !== null) {
      //   // Object THREE.Vector3 position + Camera
      //   this.currentObject.updateMatrixWorld();
      //   this.objectPosition.setFromMatrixPosition(this.currentObject.matrixWorld);
      //   this.objectPosition.project(this.camera);

      //   // Screen projection THREE.Vector2
      //   this.objectProjection.x = ( this.objectPosition.x * (this.elemWidth / 2)) + (this.elemWidth / 2);
      //   this.objectProjection.y = - ( this.objectPosition.y * (this.elemHeight / 2)) + (this.elemHeight / 2);

      //   console.log ('object', this.currentObject.position, this.objectProjection);
      // }

    }
  }
}
