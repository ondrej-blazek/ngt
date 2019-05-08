import { Directive, Input, OnInit, AfterViewInit, AfterContentInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChronosService } from '@ngs/core/chronos.service';

@Directive({
  selector: 'ngc-projector'     // tslint:disable-line
})
export class ProjectorDirective implements OnInit, AfterViewInit, AfterContentInit, OnDestroy {
  @Input() content: any;

  private parentID: string;
  private subscription: Subscription;

  constructor(
    private chronosService: ChronosService
  ) {
    this.parentID = '';

    // subscribe to home component messages
    this.subscription = this.chronosService.getMessage().subscribe(
      message => {
        if (message.type === 'setActiveObject' && message.id === this.parentID) {
          // this.userSetActiveObject(message.activeID);
        }
        if (message.type === 'clearActiveObject' && message.id === this.parentID) {
          // this.userClearActiveObject (message.activeID);
        }
        if (message.type === 'setClickedObject' && message.id === this.parentID) {
          // this.userSetClickedObject (message.clickedID);
        }
        if (message.type === 'clearClickedObject' && message.id === this.parentID) {
          // this.userClearClickedObject (message.clickedID);
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
    this.content.render(canvasRef, canvasContext);
  }
}
