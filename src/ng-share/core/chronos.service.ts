import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class ChronosService {
  private subject = new Subject<any>();
  private interactionArray: Array<string>;

  constructor() {
    this.interactionArray = [];
  }

  // Watch for speciffic Dom element to change
  elementSize(id: string, width: number, height: number) {
    this.subject.next({
      type: 'elementSize',
      id: id,
      width: width,
      height: height
    });
  }

  // Window size
  screenSize(width: number, height: number) {
    this.subject.next({
      type: 'screenSize',
      width: width,
      height: height
    });
  }

  // Screen is active / in focus
  screenIsActive(active: boolean) {
    this.subject.next({
      type: 'screenIsActive',
      status: active
    });
  }

  // mouse movement
  mouseIsMoving(id: string, mouse: THREE.Vector2) {
    this.subject.next({
      type: 'mouseMove',
      id: id,
      mouse: mouse
    });
  }
  mouseIsActive(id: string, active: boolean) {
    this.subject.next({
      type: 'mouseActive',
      id: id,
      active: active
    });
  }

  // Interractive obaject tracking
  // TODO - Propagate change to this array to Raycaster dynamically. If objects are added or removed dynamically.
  getInteraction ():Array<string> {
    return (this.interactionArray);
  }
  addToInteraction (uuid:string):void {
    this.interactionArray.push(uuid);
    let unique = this.interactionArray.filter((item, i, ar) => ( ar.indexOf(item) === i ));
    this.interactionArray = unique;
  }
  removeFromInteraction (uuid:string):void {
    let filtered = this.interactionArray.filter((item, i, ar) => ( item !== uuid ));
    this.interactionArray = filtered;
  }

  // This one is not needed!!
  sendMessage(message: string) {
    this.subject.next({
      text: message
    });
  }

  clearMessage() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
