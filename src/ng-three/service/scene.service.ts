import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable({
  providedIn: 'root'
})
export class SceneService {
  private scenes: THREE.Scene[];
  private renders: THREE.WebGLRenderer[];

  constructor() {
    this.scenes = [];
    this.renders = [];
  }

  getScene (chronosID: string, renderID: string): THREE.Scene {
    const keyName = this.keyNameFn (chronosID, renderID);
    return (this.scenes[keyName]);
  }

  setScene (chronosID: string, renderID: string, scene: THREE.Scene): void {
    const keyName = this.keyNameFn (chronosID, renderID);
    this.scenes[keyName] = scene;
  }

  getRender (chronosID: string, renderID: string): THREE.WebGLRenderer {
    const keyName = this.keyNameFn (chronosID, renderID);
    return (this.renders[keyName]);
  }

  setRender (chronosID: string, renderID: string, render: THREE.WebGLRenderer): void {
    const keyName = this.keyNameFn (chronosID, renderID);
    this.renders[keyName] = render;
  }

  keyNameFn (chronosID: string, renderID: string): string {
    const keyName = chronosID + '-' + renderID;
    return (keyName);
  }
}
