import { SphereContentServiceService } from './sphere-content-service.service';
import * as THREE from 'three';

export class DynamicContentServiceService {
  private offset: THREE.Vector3;
  private rotation: THREE.Euler;
  private scale: THREE.Vector3;
  public objectArray: SphereContentServiceService[];

  constructor() {
    this.offset = new THREE.Vector3(0, 0, 0);
    this.rotation = new THREE.Euler(0, 0, 0, 'XYZ');
    this.scale = new THREE.Vector3(1, 1, 1);
    this.objectArray = [];
  }

  setPosition (offset:THREE.Vector3):void {
    this.offset = offset;
  }

  setRotation (rotation:THREE.Euler):void {
    this.rotation = rotation;
  }

  setScale (scale:THREE.Vector3):void {
    this.scale = scale;
  }

  setAllObjects ():void {
    for (let x=1; x<=10; x++) {
      for (let z=1; z<=10; z++) {
        let sp:SphereContentServiceService = new SphereContentServiceService();
        let newPosition:THREE.Vector3 = new THREE.Vector3((x*15)-75, 10, (z*15)-75);
        sp.setPosition(newPosition.add(this.offset));
        sp.setScale(this.scale);
        sp.setRotation(this.rotation);
        sp.setDegrees(x*z*5);

        this.objectArray.push(sp);
      }
    }
  }

  render(): void {
    this.objectArray.forEach(element => {
      element.render();
    });
  }
}
