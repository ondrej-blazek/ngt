import { ShapeService } from '@ngc/service';
import * as THREE from 'three';


export class ProjectorServiceInteractiveBubble extends ShapeService {
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

export class ProjectorServiceInteractiveClose extends ShapeService {
  private circleShape: any;

  public activeFlag: boolean;
  public activeObject: THREE.Vector2;
  public clickedFlag: boolean;
  public clickedObject: THREE.Vector2;

  constructor () {
    super ();

    this.circleShape = {
      x: 20,
      y: 20,
      r: 10,
      sAngle: 0,
      eAngle: 2 * Math.PI
    };

    this.activeFlag = false;
    this.activeObject = new THREE.Vector2();
    this.clickedFlag = false;
    this.clickedObject = new THREE.Vector2();
  }

  shape (ctx: any): void {
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'red';
    ctx.fillStyle = '#0000FF';

    ctx.beginPath();
    ctx.arc(this.circleShape.x, this.circleShape.y, this.circleShape.r, this.circleShape.sAngle, this.circleShape.eAngle);

    if (ctx.isPointInPath(this.mouseX, this.mouseY)) {
      this.mouseWithinShape = true;
    } else {
      this.mouseWithinShape = false;
    }

    if (this.mouseState && this.mouseWithinShape) {
      ctx.fillStyle = '#89e84a';
    }
    if (this.mouseInView && this.mouseWithinShape) {
      ctx.strokeStyle = 'yellow';
    }

    ctx.fill();
    ctx.stroke();
  }

  animate (canvas: any, ctx: any): void {
    if (this.clickedFlag) {
      this.circleShape.x = this.clickedObject.x + 155;
      this.circleShape.y = this.clickedObject.y - 25;

      this.shape(ctx);
    }
  }
}
