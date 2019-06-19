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

  drawCircle (circle, ctx): void {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.r, circle.sAngle, circle.eAngle);
    ctx.fillStyle = '#FF0000';
    ctx.fill();
  }

  animate (canvas, ctx): void {
    this.drawCircle(this.circleShape, ctx);
  }

  mouseMove (mouseX: number, mouseY: number): void {
    // console.log ('mouseMove', mouseX, mouseY);
  }
  
  mouseClick (): void {
    // console.log ('mouseClick');
  }

  render (canvasRef, canvasContext) {
    this.animate(canvasRef, canvasContext);
  }
}
