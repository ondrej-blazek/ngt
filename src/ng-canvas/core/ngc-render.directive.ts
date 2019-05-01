import { OnInit, AfterViewInit, AfterContentInit, OnDestroy, Directive, Input, Renderer2, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { ChronosService } from '@ngs/core/chronos.service';

@Directive({
  selector: 'ngc-render'     // tslint:disable-line
})
export class NgcRenderDirective implements OnInit, AfterViewInit, AfterContentInit, OnDestroy {
  // element parameters
  @Input() id: string;
  @Input() content: any;
  @Input() data: any;

  // Canvas HTML element
  private canvas: HTMLCanvasElement;
  private canvasRef: HTMLCanvasElement;
  private canvasContext: any;

  private message: any;
  private parentID: string;
  private subscription: Subscription;

  constructor(
    private chronosService: ChronosService,
    private renderer: Renderer2,
    private element: ElementRef
  ) {
    this.parentID = '';

    // subscribe to Global environment messages
    this.subscription = this.chronosService.getMessage().subscribe(
      message => {
        this.processMessage (message);
      }
    );
  }

  ngOnInit() {
    this.canvas = this.renderer.createElement('canvas');
    this.canvasRef = this.element.nativeElement.appendChild(this.canvas);
    this.canvasRef.setAttribute('class', 'overlay');
    this.canvasContext = this.canvas.getContext('2d');
  }

  ngAfterViewInit() {
    this.canvasRef.width = 600;
    this.canvasRef.height = 400;
  }

  ngAfterContentInit() {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.content = null;
  }

  processMessage (message: any): void {
    this.message = message;
    if (this.message.type === 'elementSize' && this.message.id === this.parentID ) {
      this.canvasRef.width = this.message.width;
      this.canvasRef.height = this.message.height;
    }
  }

  renderID(passDown: string): void {
    this.parentID = passDown;
  }
  render(): void {
    if (this.content !== null) {
      this.content.render(this.canvasRef, this.canvasContext);
    }
  }
}
