import { ShapeService } from '@ngc/service';
import * as THREE from 'three';

export class ProjectorService extends ShapeService {
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
      }
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

export class ProjectorService2 extends ShapeService {
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
      }
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

export class ProjectorService3 extends ShapeService {
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
      r: 20,
      sAngle: 0,
      eAngle: 2 * Math.PI
    };

    this.activeFlag = false;
    this.activeObject = new THREE.Vector2();
    this.clickedFlag = false;
    this.clickedObject = new THREE.Vector2();
  }

  shape (ctx: any): void {
    ctx.lineWidth = 5;
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
      this.circleShape.x = this.clickedObject.x;
      this.circleShape.y = this.clickedObject.y;

      this.shape(ctx);
    }
  }
}
