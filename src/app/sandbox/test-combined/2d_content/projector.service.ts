import { ShapeService } from '@ngc/service';
import * as THREE from 'three';

export class ProjectorService extends ShapeService {
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

  drawCircle (circle, ctx): void {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.r, circle.sAngle, circle.eAngle);
    ctx.fillStyle = '#FF0000';
    ctx.fill();
  }

  animate (canvas, ctx): void {
    if (this.clickedFlag) {
      this.circleShape.x = this.clickedObject.x;
      this.circleShape.y = this.clickedObject.y;

      this.drawCircle(this.circleShape, ctx);
    }
  }
}

export class ProjectorService2 extends ShapeService {
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

  drawCircle (circle, ctx): void {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.r, circle.sAngle, circle.eAngle);
    ctx.fillStyle = '#00FF00';
    ctx.fill();
  }

  animate (canvas, ctx): void {
    if (this.clickedFlag) {
      this.circleShape.x = this.clickedObject.x;
      this.circleShape.y = this.clickedObject.y;

      this.drawCircle(this.circleShape, ctx);
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
      r: 10,
      sAngle: 0,
      eAngle: 2 * Math.PI
    };

    this.activeFlag = false;
    this.activeObject = new THREE.Vector2();
    this.clickedFlag = false;
    this.clickedObject = new THREE.Vector2();
  }

  drawCircle (circle, ctx): void {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.r, circle.sAngle, circle.eAngle);
    ctx.fillStyle = '#0000FF';
    ctx.fill();
  }

  animate (canvas, ctx): void {
    if (this.clickedFlag) {
      this.circleShape.x = this.clickedObject.x;
      this.circleShape.y = this.clickedObject.y;

      this.drawCircle(this.circleShape, ctx);
    }
  }
}
