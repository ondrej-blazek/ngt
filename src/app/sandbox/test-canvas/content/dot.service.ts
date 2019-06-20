export class DotService {
  private circleShape: any;

  constructor () {
    this.circleShape = {
      x: 20,
      y: 20,
      r: 5,
      sAngle: 0,
      eAngle: 2 * Math.PI
    };
  }

  shape (circle, ctx): void {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.r, circle.sAngle, circle.eAngle);
    ctx.fillStyle = '#FF0000';
    ctx.fill();
  }

  animate (canvas, ctx): void {
    this.shape(this.circleShape, ctx);
  }

  mouseMove (mouseX: number, mouseY: number): void {
    // console.log ('mouseMove', mouseX, mouseY);
  }

  mouseDown (mouseState: boolean): void {
    // console.log ('mouseDown', mouseState);
  }

  mouseClick (): void {
    // console.log ('mouseClick');
  }

  render (canvasRef, canvasContext) {
    this.animate(canvasRef, canvasContext);
  }
}
