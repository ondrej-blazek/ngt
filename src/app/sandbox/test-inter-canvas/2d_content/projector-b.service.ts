import { ShapeService } from '@ngc/service';
import * as THREE from 'three';

export class ProjectorServiceB extends ShapeService {
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

  shape (ctx: any, location: THREE.Vector2): void {
    if (this.imageLoaded) {
      ctx.drawImage (this.imageResource, location.x, (location.y - 24.27));
    } else {
      this.imageResource.src = '/assets/2d/bubble_1.svg';
      this.imageResource.onload = () => {
        this.imageLoaded = true;
        ctx.drawImage (this.imageResource, location.x, (location.y - 24.27));
      };
    }
  }

  animate (canvas, ctx): void {
    if (this.clickedFlag) {
      const locationVector: THREE.Vector2 = new THREE.Vector2();
      locationVector.x = this.clickedObject.x;
      locationVector.y = this.clickedObject.y;
      this.shape(ctx, locationVector);
    }
  }
}
