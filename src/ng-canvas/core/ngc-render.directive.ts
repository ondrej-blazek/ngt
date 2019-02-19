import { Directive, Input, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { ChronosService } from '@ngs/core/chronos.service';

@Directive({
  selector: 'ngc-render'     // tslint:disable-line
})
export class NgcRenderDirective {
  // element parameters
  @Input() id: string;

  private message: any;
  private parentID: string = '';
  private subscription: Subscription;
  public someValue: string = 'hua this works!!';

  constructor(
    private el: ElementRef,
    private chronosService: ChronosService
  ) {
    // subscribe to home component messages
    this.subscription = this.chronosService.getMessage().subscribe(
      message => {
        this.message = message;
      }
    );
  }

  ngOnInit() { }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(){
    console.log('NgcRenderDirective - el', this.el);
    // console.log('NgcRenderDirective - tc', this.el.nativeElement);
  }


  renderID(passDown: string): void {
    this.parentID = passDown;
  }
  render(): void {
    // console.log('ngc-render - called', this.id);
  }
}
