export class ShapeService {

  protected mouseX: number;
  protected mouseY: number;
  protected mouseInView: boolean;
  protected mouseState: boolean;

  protected intersects: boolean;
  protected myID: string;

  constructor() {
    this.mouseX = 0;
    this.mouseY = 0;
    this.mouseInView = false;
    this.mouseState = false;

    this.intersects = false;
    this.myID = '';
  }

  saveID (layerID: string) {
    this.myID = layerID;
  }

  // User interaction defaults
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
    if (this.intersects) {
      console.log('this.myID', this.myID);
    }
  }

  // Canvas rendering default
  shape (ctx: any): void {}

  animate (canvas: any, ctx: any): void {
    this.shape(ctx);
  }

  render (canvasRef: any, canvasContext: any): void {
    this.animate(canvasRef, canvasContext);
  }
}
