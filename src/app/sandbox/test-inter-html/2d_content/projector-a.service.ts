import { ShapeService } from '@ngc/service';
import * as THREE from 'three';

export class ProjectorServiceA extends ShapeService {
  private imageLoaded: boolean;
  private imageResource: any;

  public activeFlag: boolean;
  public activeObject: THREE.Vector2;
  public clickedFlag: boolean;
  public clickedObject: THREE.Vector2;

  constructor () {
    super ();

    this.imageLoaded = false;
    this.imageResource = new Image();

    this.activeFlag = false;
    this.activeObject = new THREE.Vector2();
    this.clickedFlag = false;
    this.clickedObject = new THREE.Vector2();
  }

  drawImage (location: THREE.Vector2, ctx): void {
    if (this.imageLoaded) {
      ctx.drawImage (this.imageResource, (location.x - 130), (location.y - 130));
    } else {
      this.imageResource.src = '/assets/2d/bubble_2.svg';
      this.imageResource.onload = () => {
        this.imageLoaded = true;
        ctx.drawImage (this.imageResource, (location.x - 130), (location.y - 130));
      };
    }
  }

  animate (canvas, ctx): void {
    if (this.clickedFlag) {
      const locationVector: THREE.Vector2 = new THREE.Vector2();
      locationVector.x = this.clickedObject.x;
      locationVector.y = this.clickedObject.y;
      this.drawImage(locationVector, ctx);
    }
  }
}
