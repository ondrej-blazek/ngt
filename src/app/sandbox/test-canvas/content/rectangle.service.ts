export class RectangleService {

  private mouseX: number;
  private mouseY: number;
  private mouseInView: boolean;
  private mouseState: boolean;

  private rectShape: any;
  private counter: number;

  constructor () {
    this.mouseX = 0;
    this.mouseY = 0;
    this.mouseInView = false;
    this.mouseState = false;

    this.counter = 0;

    this.rectShape = {
      x: 250,
      y: 70,
      width: 100,
      height: 50,
      borderWidth: 5
    };
  }

  shape (myRectangle, ctx): void {
    ctx.beginPath();
    ctx.rect(myRectangle.x, myRectangle.y, myRectangle.width, myRectangle.height);

    // Style
    ctx.fillStyle = '#8ED6FF';
    ctx.lineWidth = myRectangle.borderWidth;
    ctx.strokeStyle = 'black';

    if (this.mouseState && ctx.isPointInPath(this.mouseX, this.mouseY)){
      ctx.fillStyle = '#952aaa';
    }
    if (this.mouseInView && ctx.isPointInPath(this.mouseX, this.mouseY)){
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
    this.shape(this.rectShape, ctx);
  }

  mouseMove (mouseX: number, mouseY: number): void {
    this.mouseX = mouseX;
    this.mouseY = mouseY;
  }

  mouseActive (mouseInView: boolean): void {
    this.mouseInView = mouseInView;
  }

  mouseDown (mouseState: boolean): void {
    this.mouseState = mouseState;
  }

  mouseClick (): void {
    // console.log ('mouseClick', this.mouseX, this.mouseY);
  }

  render (canvasRef, canvasContext) {
    this.animate(canvasRef, canvasContext);
  }
}
