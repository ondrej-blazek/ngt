import { ShapeService } from '@ngc/service';

export class RectangleService extends ShapeService {
  private rectShape: any;
  private counter: number;

  constructor () {
    super ();

    this.counter = 0;
    this.rectShape = {
      x: 250,
      y: 70,
      width: 100,
      height: 50,
      borderWidth: 5
    };
  }

  drawRectangle (myRectangle, ctx): void {
    ctx.beginPath();
    ctx.rect(myRectangle.x, myRectangle.y, myRectangle.width, myRectangle.height);
    ctx.fillStyle = '#8ED6FF';
    ctx.fill();
    ctx.lineWidth = myRectangle.borderWidth;
    ctx.strokeStyle = 'black';
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
    this.drawRectangle(this.rectShape, ctx);
  }

  render (canvasRef, canvasContext) {
    this.animate(canvasRef, canvasContext);
  }
}
