// This class contains all functions that are required by DynamicDirective
import * as THREE from 'three';

export abstract class DynamicService {
  protected offset: THREE.Vector3;
  protected rotation: THREE.Euler;
  protected scale: THREE.Vector3;
  protected objectArray: any[];      // <<<---  THREE.Mesh

  constructor() {
    this.offset = new THREE.Vector3(0, 0, 0);
    this.rotation = new THREE.Euler(0, 0, 0, 'XYZ');
    this.scale = new THREE.Vector3(1, 1, 1);
    this.objectArray = [];
  }

  // Manage Object array
  objectArrayGet (): any[] {
    return (this.objectArray);
  }
  objectArrayAdd (mesh: any): void {
    this.objectArray.push(mesh);
  }

  // TODO - These three set functions should be combination of local offset and global position
  setPosition (offset: THREE.Vector3): void {
    this.offset = offset;
  }

  setRotation (rotation: THREE.Euler): void {
    this.rotation = rotation;
  }

  setScale (scale: THREE.Vector3): void {
    this.scale = scale;
  }

  // Render every frame and every object
  render (): void {
    this.objectArray.forEach(element => {
      element.render();
    });
  }
}
