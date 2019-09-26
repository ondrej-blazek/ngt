import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  private initialPosition: THREE.PerspectiveCamera | THREE.OrthographicCamera;
  private defaultPosition: THREE.Object3D;
  private cameraArray: THREE.Object3D[];

  constructor() {
    this.initialPosition = null;
    this.defaultPosition = null;
    this.cameraArray = [];
  }

  getInitialPosition (): THREE.PerspectiveCamera | THREE.OrthographicCamera {
    return this.initialPosition;
  }
  setInitialPosition (camera: THREE.PerspectiveCamera | THREE.OrthographicCamera): void {
    this.initialPosition = camera;
  }

  getDefaultPosition (): THREE.Object3D {
    return this.defaultPosition;
  }
  setDefaultPosition (camera: THREE.Object3D): void {
    this.defaultPosition = camera;
  }

  getCameras (): THREE.Object3D[] {
    return this.cameraArray;
  }
  addCamera (camera: THREE.Object3D): void {
    this.cameraArray.push(camera);
  }
}
