import { ShapeService } from '@ngc/service';

export class CloudService extends ShapeService {

  constructor () {
    super();
  }

  shape (ctx: any): void {
    // begin custom shape
    ctx.beginPath();
    ctx.moveTo(170, 80);
    ctx.bezierCurveTo(130, 100, 130, 150, 230, 150);
    ctx.bezierCurveTo(250, 180, 320, 180, 340, 150);
    ctx.bezierCurveTo(420, 150, 420, 120, 390, 100);
    ctx.bezierCurveTo(430, 40, 370, 30, 340, 50);
    ctx.bezierCurveTo(320, 5, 250, 20, 250, 50);
    ctx.bezierCurveTo(200, 5, 150, 20, 170, 80);

    // Style
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'blue';
    ctx.fillStyle = '#FFFFFF';

    if (ctx.isPointInPath(this.mouseX, this.mouseY)) {
      this.mouseWithinShape = true;
    } else {
      this.mouseWithinShape = false;
    }

    if (this.mouseState && this.mouseWithinShape) {
      ctx.fillStyle = '#89e84a';
    }
    if (this.mouseInView && this.mouseWithinShape) {
      ctx.strokeStyle = 'red';
    }

    // complete custom shape
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
}
