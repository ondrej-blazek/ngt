import { ShapeService } from '@ngc/service';
import * as THREE from 'three';

export class ProjectorServiceC extends ShapeService {
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
      this.circleShape.x = this.clickedObject.x;
      this.circleShape.y = this.clickedObject.y;

      this.shape(ctx);
    }
  }
}
