import { Directive, OnInit, AfterContentInit, ElementRef, HostListener, ContentChild } from '@angular/core';

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

  private domID: string;
  private domWidth: number;
  private domHeight: number;

  constructor(
    private el: ElementRef,
    private chronosService: ChronosService
  ) {
    this.windowWidth = 0;
    this.windowHeight = 0;
    this.domID = '';
    this.domWidth = 0;
    this.domHeight = 0;
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
}
