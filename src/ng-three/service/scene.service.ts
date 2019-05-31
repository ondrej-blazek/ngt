import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class SceneService {
  public scene: THREE.Scene;

  constructor() {}

  getScene (): THREE.Scene {
    return this.scene;
  }
  setScene (scene: THREE.Scene): void {
    this.scene = scene;
  }
}
