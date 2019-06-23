import { ShapeService } from '@ngc/service';

export class RectangleService extends ShapeService {

  private rectShape: any;
  private counter: number;

  constructor () {
    super();

    this.counter = 0;
    this.rectShape = {
      x: 250,
      y: 70,
      width: 100,
      height: 50,
      borderWidth: 5
    };
  }

  shape (ctx): void {
    ctx.beginPath();
    ctx.rect(this.rectShape.x, this.rectShape.y, this.rectShape.width, this.rectShape.height);

    // Style
    ctx.fillStyle = '#8ED6FF';
    ctx.lineWidth = this.rectShape.borderWidth;
    ctx.strokeStyle = 'black';

    if (ctx.isPointInPath(this.mouseX, this.mouseY)) {
      this.mouseWithinShape = true;
    } else {
      this.mouseWithinShape = false;
    }

    if (this.mouseState && this.mouseWithinShape){
      ctx.fillStyle = '#952aaa';
    }
    if (this.mouseInView && this.mouseWithinShape){
      ctx.strokeStyle = 'red';
    }

    // complete custom shape
    ctx.fill();
    ctx.stroke();
  }

  animate (canvas, ctx): void {
    // update
    this.counter++;
    this.counter = (this.counter === 360) ? 0 : this.counter;

    // let time = (new Date()).getTime() - startTime;
    const amplitude = 150;

    // in ms
    const period = 360;
    const centerX = canvas.width / 2 - this.rectShape.width / 2;
    const nextX = amplitude * Math.sin(this.counter * 2 * Math.PI / period) + centerX;
    this.rectShape.x = nextX;

    // draw
    this.shape(ctx);
  }
}
