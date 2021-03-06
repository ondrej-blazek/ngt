import { Directive, OnInit, AfterContentInit, AfterViewInit, ElementRef, HostListener, ContentChild } from '@angular/core';
import * as THREE from 'three';

import { ChronosService } from '@ngs/core/chronos.service';
import { ChronosDirective } from '@ngs/core/chronos.directive';

@Directive({
  selector: '[ngsreporter]'       // tslint:disable-line
})
export class ReporterDirective implements OnInit, AfterContentInit, AfterViewInit {
  @ContentChild(ChronosDirective, {static: true}) chronosDirective: ChronosDirective;

  private windowWidth: number;
  private windowHeight: number;
  private mouse: THREE.Vector2;
  private mouseIsActive: boolean;

  private domID: string;
  private domWidth: number;
  private domHeight: number;
  private domScrollTop: number;
  private uuid: string;

  constructor (
    private el: ElementRef,
    private chronosService: ChronosService
  ) {
    this.windowWidth = 0;
    this.windowHeight = 0;
    this.mouse = new THREE.Vector2();
    this.mouseIsActive = false;

    this.domID = '';
    this.domWidth = 0;
    this.domHeight = 0;
    this.domScrollTop = 0;
    this.uuid = this.chronosService.generateUUID();
  }

  ngOnInit () {    // Update chronos BEFORE rendering starts
    // Stash this DOM element
    this.el.nativeElement.id = this.uuid;
    this.chronosService.addToDOM (this.uuid, this.el.nativeElement);

    if (this.chronosDirective) {
      this.chronosDirective.processID(this.uuid);
      this.sizeReportFunction();
    }
  }

  ngAfterContentInit () {
    this.sizeReportFunction();
  }

  ngAfterViewInit () {
    this.sizeReportFunction();

    // 3, 7, 15ms delay     // TODO - Is there not a better way to handle or call back?
    setTimeout(() => {
      this.sizeReportFunction();
    }, 3);

    setTimeout(() => {
      this.sizeReportFunction();
    }, 7);

    setTimeout(() => {
      this.sizeReportFunction();
    }, 15);
  }

  // ---------------------------------------------------------------------------------

  // Browser events / resize
  @HostListener ('window:resize')
  @HostListener ('window:vrdisplaypresentchange')
  resetWidthHeight (): void {
    this.sizeReportFunction();
  }

  sizeReportFunction (): void {
    // Window
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    this.chronosService.screenSize(this.windowWidth, this.windowHeight);

    // DOM Element
    this.domID = this.uuid;
    this.domWidth = this.el.nativeElement.clientWidth;
    this.domHeight = this.el.nativeElement.clientHeight;
    this.chronosService.elementSize(this.domID, this.domWidth, this.domHeight);
  }


  // Window events / mouse position
  @HostListener ('window:focus')
  windowFocus (): void {
    this.chronosService.screenIsActive(true);
  }

  @HostListener ('window:blur')
  windowBlur (): void {
    this.chronosService.screenIsActive(false);
  }

  @HostListener ('window:scroll')
  windowScroll (): void {
    this.domScrollTop = window.scrollY;
    this.localMousePosition();
  }

  @HostListener ('document:mousemove', ['$event'])
  onMouseMove (e) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
    this.localMousePosition();
  }

  localMousePosition (): void {
    const localX = (this.mouse.x - this.el.nativeElement.offsetLeft);
    // const localY = (this.mouse.y - (
    //    (this.el.nativeElement.parentElement.offsetTop + this.el.nativeElement.offsetTop) - this.domScrollTop)
    // );
    const localY = (this.mouse.y - (this.el.nativeElement.parentElement.offsetTop - this.domScrollTop));
    const localMouse = new THREE.Vector2();

    if (localX > 0 && localX <= this.domWidth && localY > 0 && localY <= this.domHeight) {
      localMouse.x = ( localX / this.domWidth ) * 2 - 1;
      localMouse.y = -( localY / this.domHeight ) * 2 + 1;

      this.chronosService.mouseIsMoving(this.domID, localMouse);
      if (this.mouseIsActive !== true) {
        this.mouseIsActive = true;
        this.chronosService.mouseIsActive(this.domID, this.mouseIsActive);
      }
    } else {
      if (this.mouseIsActive !== false) {
        this.mouseIsActive = false;
        this.chronosService.mouseIsActive(this.domID, this.mouseIsActive);
      }
    }
  }

  // Mouse events
  @HostListener ('document:mousedown', ['$event'])
  onMouseDown (e) {
    this.mouseEvents('mousedown', e);
  }

  @HostListener ('document:mouseup', ['$event'])
  onMouseUp (e) {
    this.mouseEvents('mouseup', e);
  }

  @HostListener ('document:click', ['$event'])
  onMouseClick (e) {
    this.mouseEvents('click', e);
  }

  // mouseEvents (type: string, event: MouseEvent): void {
  mouseEvents (type: string, event: any): void {
    let itPass = false;

    // Limit click source only to current scene
    for (const item of event.path) {
      if (item.id === this.domID) {
        itPass = true;
        break;
      }
    }

    // Button Notes
    //  event.button === 0   ->  Left button
    //  event.button === 1   ->  Middle button
    //  event.button === 2   ->  Right button

    if (itPass) {
      if (type === 'mousedown' && event.button === 0) {
        this.chronosService.mouseIsDown (this.domID, true);
      }
      if (type === 'mouseup' && event.button === 0) {
        this.chronosService.mouseIsDown (this.domID, false);
      }
      if (type === 'click' && event.button === 0) {
        this.chronosService.mouseClick (this.domID);
      }
    }

  }
}
