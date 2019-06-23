import { ShapeService } from '@ngc/service';

export class DotService extends ShapeService {
  private circleShape: any;

  constructor () {
    super();

    this.circleShape = {
      x: 20,
      y: 20,
      r: 5,
      sAngle: 0,
      eAngle: 2 * Math.PI
    };
  }

  shape (ctx): void {
    ctx.beginPath();
    ctx.arc(this.circleShape.x, this.circleShape.y, this.circleShape.r, this.circleShape.sAngle, this.circleShape.eAngle);
    ctx.fillStyle = '#FF0000';
    ctx.fill();
  }
}
