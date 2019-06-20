export class CloudService {

  private mouseX: number;
  private mouseY: number;
  private mouseInView: boolean;
  private mouseState: boolean;

  constructor () {
    this.mouseX = 0;
    this.mouseY = 0;
    this.mouseInView = false;
    this.mouseState = false;
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

    if (this.mouseState && ctx.isPointInPath(this.mouseX, this.mouseY)){
      ctx.fillStyle = '#89e84a';
    }
    if (this.mouseInView && ctx.isPointInPath(this.mouseX, this.mouseY)){
      ctx.strokeStyle = 'red';
    }

    // complete custom shape
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  animate (canvas, ctx): void {
    this.shape(ctx);
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
