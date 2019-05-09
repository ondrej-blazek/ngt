import {
  OnInit,
  AfterViewInit,
  AfterContentInit,
  OnDestroy,
  Directive,
  Input,
  Renderer2,
  ElementRef,
  ContentChildren,
  QueryList
} from '@angular/core';
import { ShapeDirective, ProjectorDirective } from '@ngc/format';
import { Subscription } from 'rxjs';

import { ChronosService } from '@ngs/core/chronos.service';

@Directive({
  selector: 'ngc-render'     // tslint:disable-line
})
export class NgcRenderDirective implements OnInit, AfterViewInit, AfterContentInit, OnDestroy {
  @ContentChildren(ShapeDirective) shapeDomQuery: QueryList<ShapeDirective>;
  @ContentChildren(ProjectorDirective) projectorDomQuery: QueryList<ProjectorDirective>;

  @Input() id: string;
  @Input() class: string;

  // Canvas HTML element
  private shapeDirectives: ShapeDirective[];
  private projectorDirectives: ProjectorDirective[];

  private parentID: string;
  private subscription: Subscription;

  private canvas: HTMLCanvasElement;
  private canvasRef: HTMLCanvasElement;
  private canvasContext: any;

  constructor (
    private chronosService: ChronosService,
    private renderer: Renderer2,
    private element: ElementRef
  ) {
    this.parentID = '';

    this.subscription = this.chronosService.getMessage().subscribe(
      message => {
        if (message.type === 'elementSize' && message.id === this.parentID ) {
          this.updateCanvasSize (message.width, message.height);
        }
      }
    );
  }

  ngOnInit () {
    // Canvas
    this.canvas = this.renderer.createElement('canvas');
    this.canvasRef = this.element.nativeElement.appendChild(this.canvas);
    this.canvasRef.setAttribute('class', this.class);
    this.canvasContext = this.canvas.getContext('2d');

    // Canvas props
    this.canvasRef.width = 600;
    this.canvasRef.height = 400;
  }

  ngAfterViewInit () {}

  ngAfterContentInit () {
    this.shapeDirectives = this.shapeDomQuery.toArray();
    this.projectorDirectives = this.projectorDomQuery.toArray();
  }

  ngOnDestroy () {
    this.subscription.unsubscribe();
  }

  updateCanvasSize (width: number, height: number): void {
    this.canvasRef.width = width;
    this.canvasRef.height = height;
  }

  renderID (passDown: string): void {
    this.parentID = passDown;
    this.propagateID (passDown);
  }

  propagateID (passDown: string): void {
    for (const oneShape of this.shapeDirectives) {
      oneShape.renderID(passDown);
    }
    for (const oneProjector of this.projectorDirectives) {
      oneProjector.renderID(passDown);
    }
  }

  render (): void {
    // clear
    this.canvasContext.clearRect(0, 0, this.canvasRef.width, this.canvasRef.height);

    // add to render
    for (const oneShape of this.shapeDirectives) {
      oneShape.render(this.canvasRef, this.canvasContext);
    }
    for (const oneProjector of this.projectorDirectives) {
      oneProjector.render(this.canvasRef, this.canvasContext);
    }
  }
}
