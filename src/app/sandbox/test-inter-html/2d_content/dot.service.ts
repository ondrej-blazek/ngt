import { ShapeService } from '@ngc/service';
import { extend } from 'webdriver-js-extender';

export class DotService extends ShapeService {
  private circleShape: any;

  constructor () {
    super ();

    this.circleShape = {
      x: 20,
      y: 20,
      r: 5,
      sAngle: 0,
      eAngle: 2 * Math.PI
    };
  }

  drawCircle (circle, ctx): void {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.r, circle.sAngle, circle.eAngle);
    ctx.fillStyle = '#FF0000';
    ctx.fill();
  }

  animate (canvas, ctx): void {
    this.drawCircle(this.circleShape, ctx);
  }

  render (canvasRef, canvasContext) {
    this.animate(canvasRef, canvasContext);
  }
}
