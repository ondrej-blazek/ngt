// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
export class TestContentServiceService {

  private rectShape: any;
  private counter: number;

  constructor() {
    // console.log('TestContentServiceService - constructor');
    this.counter = 0;

    this.rectShape = {
      x: 250,
      y: 70,
      width: 100,
      height: 50,
      borderWidth: 5
    };
  }

  // ngAfterViewInit() {
  //   // console.log('TestContDirective - ngAfterViewInit');
  // }

  // ngAfterContentInit() {
  //   // console.log('TestContDirective - ngAfterContentInit');
  // }



  cloud(ctx: any): void {
    // begin custom shape
    ctx.beginPath();
    ctx.moveTo(170, 80);
    ctx.bezierCurveTo(130, 100, 130, 150, 230, 150);
    ctx.bezierCurveTo(250, 180, 320, 180, 340, 150);
    ctx.bezierCurveTo(420, 150, 420, 120, 390, 100);
    ctx.bezierCurveTo(430, 40, 370, 30, 340, 50);
    ctx.bezierCurveTo(320, 5, 250, 20, 250, 50);
    ctx.bezierCurveTo(200, 5, 150, 20, 170, 80);

    // complete custom shape
    ctx.closePath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'blue';
    ctx.stroke();
  }

  drawRectangle(myRectangle, ctx): void {
    ctx.beginPath();
    ctx.rect(myRectangle.x, myRectangle.y, myRectangle.width, myRectangle.height);
    ctx.fillStyle = '#8ED6FF';
    ctx.fill();
    ctx.lineWidth = myRectangle.borderWidth;
    ctx.strokeStyle = 'black';
    ctx.stroke();
  }

  animate(canvas, ctx): void {
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

    // clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw
    this.cloud (ctx);
    this.drawRectangle(this.rectShape, ctx);
  }

  render (canvasRef, canvasContext) {
    this.animate(canvasRef, canvasContext);
  }
}
