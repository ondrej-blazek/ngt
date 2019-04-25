import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class ChronosService {
  private subject = new Subject<any>();

  constructor() { }

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
