import { Directive, ElementRef, HostListener, ContentChild } from '@angular/core';

import { ChronosService } from '@ngs/core/chronos.service';
import { ChronosDirective } from '@ngs/core/chronos.directive';

@Directive({
  selector: '[ngsreporter]'
})
export class ReporterDirective {
  // child directives - Each reporter should only handle one chronos
  @ContentChild(ChronosDirective) ChronosDirective: ChronosDirective;

  get chronos() {
    return this.ChronosDirective;
  }

  private windowWidth: number = 0;
  private windowHeight: number = 0;
  
  private domID: string = '';
  private domWidth: number = 0;
  private domHeight: number = 0;

  constructor(
    private el: ElementRef,
    private chronosService: ChronosService
  ) { }

  ngOnInit() {    // Update chronos BEFORE rendering starts
    if (this.chronos) this.chronos.idUpdate(this.el.nativeElement.id);
  }


  // Browser events / resize
  @HostListener('window:resize')
  @HostListener('window:vrdisplaypresentchange')
  resetWidthHeight(): void {
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

  @HostListener('window:focus')
  windowFocus(): void {
    this.chronosService.screenIsActive(true);
  }

  @HostListener('window:blur')
  windowBlur(): void {
    this.chronosService.screenIsActive(false);
  }
}
