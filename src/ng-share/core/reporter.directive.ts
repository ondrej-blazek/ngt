import { Directive, OnInit, AfterContentInit, ElementRef, HostListener, ContentChild } from '@angular/core';
import * as THREE from 'three';

import { ChronosService } from '@ngs/core/chronos.service';
import { ChronosDirective } from '@ngs/core/chronos.directive';

@Directive({
  selector: '[ngsreporter]'       // tslint:disable-line
})
export class ReporterDirective implements OnInit, AfterContentInit {
  @ContentChild(ChronosDirective) ChronosDirective: ChronosDirective;

  get chronos() {
    return this.ChronosDirective;
  }

  private windowWidth: number;
  private windowHeight: number;
  private mouse: THREE.Vector2;
  private mouseIsActive: boolean;

  private domID: string;
  private domWidth: number;
  private domHeight: number;
  private domScrollTop: number;

  constructor(
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
  }

  ngOnInit() {    // Update chronos BEFORE rendering starts
    if (this.chronos) {
      this.chronos.idUpdate(this.el.nativeElement.id);
      this.sizeReportFunction();
    }
  }

  ngAfterContentInit() {
    this.sizeReportFunction();
  }

  sizeReportFunction(): void {
    // Window
    this.windowWidth = window.innerWidth;
    this.windowHeight = window.innerHeight;
    this.chronosService.screenSize(this.windowWidth, this.windowHeight);

    // DOM Element
    this.domID = this.el.nativeElement.id;
    this.domWidth = this.el.nativeElement.clientWidth;
    this.domHeight = this.el.nativeElement.clientHeight;
    this.chronosService.elementSize(this.domID, this.domWidth, this.domHeight);
  }

  localMousePosition () {
    let localX = (this.mouse.x - this.el.nativeElement.offsetLeft);
    let localY = (this.mouse.y - (this.el.nativeElement.offsetTop - this.domScrollTop));
    let localMouse = new THREE.Vector2();

    if(localX > 0 && localX <= this.domWidth && localY > 0 && localY <= this.domHeight) {
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

  // Browser events / resize
  @HostListener('window:resize')
  @HostListener('window:vrdisplaypresentchange')
  resetWidthHeight(): void {
    this.sizeReportFunction();
  }

  @HostListener('window:focus')
  windowFocus(): void {
    this.chronosService.screenIsActive(true);
  }

  @HostListener('window:blur')
  windowBlur(): void {
    this.chronosService.screenIsActive(false);
  }

  @HostListener('window:scroll')
  windowScroll(): void {
    this.domScrollTop = window.scrollY;
    this.localMousePosition();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e) {
    this.mouse.x = e.clientX;
    this.mouse.y = e.clientY;
    this.localMousePosition();
  }
}
