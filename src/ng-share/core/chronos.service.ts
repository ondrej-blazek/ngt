import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class ChronosService {
  private subject = new Subject<any>();
  private domElements: any[];
  private interactionArray: Array<string>;

  private activeObject: any;
  private clickedObject: any;
  private activeOverlay: boolean;
  private interactiveCanvasLayers: string[];
  private interactiveDomLayers: string[];

  constructor () {
    this.domElements = [];
    this.interactionArray = [];
    this.activeObject = null;
    this.clickedObject = null;
    this.activeOverlay = false;
    this.interactiveCanvasLayers = [];
    this.interactiveDomLayers = [];
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
  elementSize (id: string, width: number, height: number): void {
    this.subject.next({
      type: 'elementSize',
      id: id,
      width: width,
      height: height
    });
  }

  // Window size
  screenSize (width: number, height: number): void {
    this.subject.next({
      type: 'screenSize',
      width: width,
      height: height
    });
  }

  // Screen is active / in focus
  screenIsActive (active: boolean): void {
    this.subject.next({
      type: 'screenIsActive',
      status: active
    });
  }

  // Active Layer
  enableLayer (id: string, layerNo: number): void {
    this.subject.next({
      type: 'enableLayer',
      id: id,
      layerNo: layerNo
    });
  }
  disableLayer (id: string, layerNo: number): void {
    this.subject.next({
      type: 'disableLayer',
      id: id,
      layerNo: layerNo
    });
  }
  toggleLayer (id: string, layerNo: number): void {
    this.subject.next({
      type: 'toggleLayer',
      id: id,
      layerNo: layerNo
    });
  }

  // mouse movement / events
  mouseIsMoving (id: string, mouse: THREE.Vector2): void {
    this.subject.next({
      type: 'mouseMove',
      id: id,
      mouse: mouse
    });
  }
  mouseIsActive (id: string, active: boolean): void {
    this.subject.next({
      type: 'mouseActive',
      id: id,
      active: active
    });
  }
  mouseIsDown (id: string, down: boolean): void {
    this.subject.next({
      type: 'mouseDown',
      id: id,
      down: down
    });
  }
  mouseClick (id: string): void {
    this.subject.next({
      type: 'mouseClick',
      id: id
    });
  }

  // 3D to 2D projection data
  activeProjection (id: string, coordinates: THREE.Vector2): void {
    this.subject.next({
      type: 'activeProjection',
      id: id,
      coordinates: coordinates
    });
  }
  clickedProjection (id: string, coordinates: THREE.Vector2): void {
    this.subject.next({
      type: 'clickedProjection',
      id: id,
      coordinates: coordinates
    });
  }

  // Overlay Canvas or DOM broadcast
  broadcastOverlayUpdate (): void {
    this.activeOverlay = (this.interactiveCanvasLayers.length > 0 || this.interactiveDomLayers.length > 0) ? true : false;
    this.subject.next({
      type: 'activeOverlay',
      active: this.activeOverlay
    });
  }

  // Projection Canvas layers
  canvasLayerAddition (uuid: string): void {
    this.interactiveCanvasLayers.push(uuid);
    const unique = this.interactiveCanvasLayers.filter((item, i, ar) => ( ar.indexOf(item) === i ));
    this.interactiveCanvasLayers = unique;
    this.broadcastOverlayUpdate();
  }
  canvasLayerRemoval (uuid: string): void {
    if (this.interactiveCanvasLayers.length > 0) {
      const filtered = this.interactiveCanvasLayers.filter((item, i, ar) => ( item !== uuid ));
      this.interactiveCanvasLayers = filtered;
      this.broadcastOverlayUpdate();
    }
  }
  canvasCloseEvent (chronosID: string, canvasUUID: string): void {
    // This is for CLOSE cavnas layer event only. By clicking this layer it will simulate click on 3D object and thus toggle to inactive
    if (this.interactiveCanvasLayers.length > 0) {
      this.updateClickedObject(chronosID, this.clickedObject);
    }
  }

  // active DOM Elements within the page
  getDOM (chronosID: string): HTMLElement {
    return (this.domElements[chronosID]);
  }
  addToDOM (chronosID: string, domElement: HTMLElement): void {
    this.domElements[chronosID] = domElement;
  }
  removeFromDOM (chronosID: string): void {
    this.domElements[chronosID] = null;
  }

  // Projection Canvas layers
  domLayerAddition (uuid: string): void {
    this.interactiveDomLayers.push(uuid);
    const unique = this.interactiveDomLayers.filter((item, i, ar) => ( ar.indexOf(item) === i ));
    this.interactiveDomLayers = unique;
    this.broadcastOverlayUpdate();
  }
  domLayerRemoval (uuid: string): void {
    if (this.interactiveDomLayers.length > 0) {
      const filtered = this.interactiveDomLayers.filter((item, i, ar) => ( item !== uuid ));
      this.interactiveDomLayers = filtered;
      this.broadcastOverlayUpdate();
    }
  }
  domCloseEvent (chronosID: string, canvasUUID: string): void {
    if (this.interactiveDomLayers.length > 0) {
      this.updateClickedObject(chronosID, this.clickedObject);
    }
  }

  // Interactive object tracking
  getInteraction (): Array<string> {
    return (this.interactionArray);
  }
  resetInteraction (): void {
    this.interactionArray = [];
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
      name: oneObject.name,
      clickedID: oneObject.uuid
    });
  }
  clearClickedObject (id: string, oneObject: any): void {
    this.subject.next({
      type: 'clearClickedObject',
      id: id,
      name: oneObject.name,
      clickedID: oneObject.uuid
    });
  }
  updateClickedObject (id: string, oneObject: any): void {
    if (this.clickedObject === null) {
      this.clickedObject = oneObject;
      if (oneObject !== null) {
        this.setClickedObject (id, oneObject);
      }
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
  resetClickedObject (chronosID: string): void {
    if (this.clickedObject !== null) {
      this.updateClickedObject (chronosID, this.clickedObject);
    }
  }

  // Camera updates
  setSetDefaultCameraPosition (id: string): void {
    this.subject.next({
      type: 'setSetDefaultCameraPosition',
      id: id
    });
  }
  switchToCamera (id: string, index: number): void {
    this.subject.next({
      type: 'switchToCamera',
      id: id,
      index: index
    });
  }
}
