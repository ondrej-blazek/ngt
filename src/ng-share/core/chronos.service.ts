import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class ChronosService {
  private subject = new Subject<any>();
  private interactionArray: Array<string>;

  private activeObject: any;
  private clickedObject: any;

  public activeObjectProjection: THREE.Vector2;
  public clickedObjectProjection: THREE.Vector2;


  constructor () {
    this.interactionArray = [];
    this.activeObject = null;
    this.clickedObject = null;

    this.activeObjectProjection = new THREE.Vector2();
    this.clickedObjectProjection = new THREE.Vector2();
  }

  // Main
  getMessage (): Observable<any> {
    return this.subject.asObservable();
  }
  clearMessage (): void {
    this.subject.next();
  }

/*
 *   DO NOT set 'type' dynamically. Use this service to track event(s) on your channel
 */

  // Watch for specific Dom element to change
  elementSize (id: string, width: number, height: number) {
    this.subject.next({
      type: 'elementSize',
      id: id,
      width: width,
      height: height
    });
  }

  // Window size
  screenSize (width: number, height: number) {
    this.subject.next({
      type: 'screenSize',
      width: width,
      height: height
    });
  }

  // Screen is active / in focus
  screenIsActive (active: boolean) {
    this.subject.next({
      type: 'screenIsActive',
      status: active
    });
  }

  // Active Layer
  enableLayer (id: string, layerNo: number) {
    this.subject.next({
      type: 'enableLayer',
      id: id,
      layerNo: layerNo
    });
  }
  disableLayer (id: string, layerNo: number) {
    this.subject.next({
      type: 'disableLayer',
      id: id,
      layerNo: layerNo
    });
  }
  toggleLayer (id: string, layerNo: number) {
    this.subject.next({
      type: 'toggleLayer',
      id: id,
      layerNo: layerNo
    });
  }

  // mouse movement / events
  mouseIsMoving (id: string, mouse: THREE.Vector2) {
    this.subject.next({
      type: 'mouseMove',
      id: id,
      mouse: mouse
    });
  }
  mouseIsActive (id: string, active: boolean) {
    this.subject.next({
      type: 'mouseActive',
      id: id,
      active: active
    });
  }
  mouseIsDown (id: string, down: boolean) {
    this.subject.next({
      type: 'mouseDown',
      id: id,
      down: down
    });
  }
  mouseClick (id: string) {
    this.subject.next({
      type: 'mouseClick',
      id: id
    });
  }

  // Interactive object tracking
  // TODO - Propagate change to this array to Raycaster dynamically. If objects are added or removed dynamically.
  getInteraction (): Array<string> {
    return (this.interactionArray);
  }
  addToInteraction (uuid: string): void {
    this.interactionArray.push(uuid);
    const unique = this.interactionArray.filter((item, i, ar) => ( ar.indexOf(item) === i ));
    this.interactionArray = unique;
  }
  removeFromInteraction (uuid: string): void {
    const filtered = this.interactionArray.filter((item, i, ar) => ( item !== uuid ));
    this.interactionArray = filtered;
  }

  // Raycaster active object
  getActiveObject (): any {
    return (this.activeObject);
  }
  setActiveObject (id: string, oneObject: any): void {
    this.activeObject = oneObject;
    this.subject.next({
      type: 'setActiveObject',
      id: id,
      activeID: oneObject.uuid
    });
  }
  clearActiveObject (id: string, oneObject: any): void {
    this.activeObject = null;
    this.subject.next({
      type: 'clearActiveObject',
      id: id,
      activeID: oneObject.uuid
    });
  }

  // Raycaster clicked object
  getClickedObject (): any {
    return (this.clickedObject);
  }
  setClickedObject (id: string, oneObject: any): void {
    this.subject.next({
      type: 'setClickedObject',
      id: id,
      clickedID: oneObject.uuid
    });
  }
  clearClickedObject (id: string, oneObject: any): void {
    this.subject.next({
      type: 'clearClickedObject',
      id: id,
      clickedID: oneObject.uuid
    });
  }
  updateClickedObject (id: string, oneObject: any): void {
    if (this.clickedObject === null) {
      this.clickedObject = oneObject;
      this.setClickedObject (id, oneObject);
    } else {
      if (this.clickedObject.uuid === oneObject.uuid ) {
        this.clickedObject = null;
        this.clearClickedObject (id, oneObject);
      } else {
        this.clearClickedObject (id, this.clickedObject);
        this.clickedObject = oneObject;
        this.setClickedObject (id, oneObject);
      }
    }
  }
}
