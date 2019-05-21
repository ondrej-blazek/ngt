import { Directive, Input, OnInit, AfterViewInit, AfterContentInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
// import * as THREE from 'three';

import { ChronosService } from '@ngs/core/chronos.service';

@Directive({
  selector: 'ngc-projector'     // tslint:disable-line
})
export class ProjectorDirective implements OnInit, AfterViewInit, AfterContentInit, OnDestroy {
  @Input() content: any;

  private parentID: string;
  private subscription: Subscription;
  private activeFlag: boolean;
  private clickedFlag: boolean;

  constructor(
    private chronosService: ChronosService
  ) {
    this.parentID = '';
    this.activeFlag = false;
    this.clickedFlag = false;

    // subscribe to home component messages
    this.subscription = this.chronosService.getMessage().subscribe(
      message => {
        if (message.type === 'setActiveObject' && message.id === this.parentID && this.content) {
          this.activeFlag = false;
          this.content.activeFlag = true;
          this.content.activeObject = this.chronosService.activeObjectProjection;
        }
        if (message.type === 'clearActiveObject' && message.id === this.parentID && this.content) {
          this.activeFlag = false;
          this.content.activeFlag = false;
          this.content.activeObject = null;
        }
        if (message.type === 'setClickedObject' && message.id === this.parentID && this.content) {
          this.clickedFlag = true;
          this.content.clickedFlag = true;
          this.content.clickedObject = this.chronosService.activeObjectProjection;
        }
        if (message.type === 'clearClickedObject' && message.id === this.parentID && this.content) {
          this.clickedFlag = false;
          this.content.clickedFlag = false;
          this.content.clickedObject = null;
        }
      }
    );
  }

  ngOnInit () {}
  ngAfterViewInit () {}
  ngAfterContentInit () {}
  ngOnDestroy () {
    this.content = null;
  }

  renderID (passDown: string): void {
    this.parentID = passDown;
  }

  render (canvasRef, canvasContext): void {
    if (this.activeFlag) {
      this.content.activeObject = this.chronosService.activeObjectProjection;
    }
    if (this.clickedFlag) {
      this.content.clickedObject = this.chronosService.clickedObjectProjection;
    }

    this.content.render(canvasRef, canvasContext);
  }
}
