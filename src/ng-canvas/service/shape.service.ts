export class ShapeService {

  protected mouseX: number;
  protected mouseY: number;
  protected mouseInView: boolean;
  protected mouseStateLast: boolean;
  protected mouseState: boolean;

  protected mouseWithinShape: boolean;
  protected mouseOneOff: boolean;
  protected intersects: boolean;
  protected uuid: string;

  constructor() {
    this.mouseX = 0;
    this.mouseY = 0;
    this.mouseInView = false;
    this.mouseStateLast = false;
    this.mouseState = false;

    this.mouseWithinShape = false;
    this.mouseOneOff = true;
    this.intersects = false;
    this.uuid = this.generateUUID();
  }

  // ShapeID
  getUUID (): string {
    return (this.uuid);
  }

  makeRandomString (length: number): string {
    let text: string = '';
    const char_list = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    for (let i=0; i < length; i++ ) {
      text += char_list.charAt(Math.floor(Math.random() * char_list.length));
    }
    return text;
  }
  generateUUID (): string {
    let newUUID = "";
    newUUID += this.makeRandomString(8);
    newUUID += '-';
    newUUID += this.makeRandomString(4);
    newUUID += '-';
    newUUID += this.makeRandomString(4);
    newUUID += '-';
    newUUID += this.makeRandomString(4);
    newUUID += '-';
    newUUID += this.makeRandomString(12);
    return (newUUID);
  }

  // User interaction defaults
  mouseMove (mouseX: number, mouseY: number): void {
    this.mouseX = mouseX;
    this.mouseY = mouseY;
  }

  mouseActive (mouseInView: boolean): void {
    this.mouseInView = mouseInView;
  }

  mouseDown (): void {
    console.log ('mouseDown', this.uuid);
  }
  mouseHoldDown (mouseState: boolean): void {
    this.mouseState = mouseState;
    // console.log ('mouseHoldDown', this.uuid);
  }
  mouseRelease (): void {
    console.log ('mouseRelease', this.uuid);
  }

  mouseClick (): void {}

  // Canvas rendering default
  shape (ctx: any): void {}

  animate (canvas: any, ctx: any): void {
    this.shape(ctx);
  }

  render (canvasRef: any, canvasContext: any): void {
    // User events
    if (this.mouseInView && this.mouseState && this.mouseWithinShape && this.mouseOneOff === this.mouseState) {
      this.mouseStateLast = this.mouseState;
      this.mouseOneOff = false;
      this.mouseDown();
    }

    if (this.mouseStateLast && !this.mouseState && !this.mouseOneOff){
      this.mouseOneOff = true;
      this.mouseRelease ();
    }

    this.animate(canvasRef, canvasContext);
  }
}
