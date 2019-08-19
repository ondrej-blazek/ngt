import * as THREE from 'three';
import { DynamicService } from '@ngt/service';
import { SphereContentServiceService } from './sphere-content-service.service';

export class DynamicContentServiceService extends DynamicService {

  constructor () {
    super();
  }

  setAllObjects (): void {
    for (let x = 1; x <= 10; x++) {
      for (let z = 1; z <= 10; z++) {
        const sp: SphereContentServiceService = new SphereContentServiceService();
        const newPosition: THREE.Vector3 = new THREE.Vector3((x * 15) - 75, 10, (z * 15) - 75);
        sp.setPosition(newPosition.add(this.offset));
        sp.setScale(this.scale);
        sp.setRotation(this.rotation);
        sp.setDegrees(x * z * 5);

        this.objectArrayAdd (sp);
      }
    }
  }

  // User interaction
  userSetActiveObject(element: any): void {
    if (element.object.material.color === element.clickedColor || element.object.material.color === element.clickedHighlightColor) {
      element.object.material.color = element.clickedHighlightColor;
    } else {
      element.object.material.color = element.highlightColor;
    }
  }

  userClearActiveObject(element: any): void {
    if (element.object.material.color === element.clickedColor || element.object.material.color === element.clickedHighlightColor) {
      element.object.material.color = element.clickedColor;
    } else {
      element.object.material.color = element.defaultColor;
    }
  }

  userSetClickedObject(element: any): void {
    element.object.material.color = element.clickedColor;
  }

  userClearClickedObject(element: any): void {
    element.object.material.color = element.defaultColor;
  }
}
