import { Directive, Input } from '@angular/core';
import { Subscription } from 'rxjs';

import { ChronosService } from '@ngs/core/chronos.service';

@Directive({
  selector: 'ngc-render'     // tslint:disable-line
})
export class NgcRenderDirective {
  // element parameters
  @Input() id: string;

  private message: any;
  private parentID: string = "";
  private subscription: Subscription;

  constructor(
    private chronosService: ChronosService
  ) {
    // subscribe to home component messages
    this.subscription = this.chronosService.getMessage().subscribe(
      message => {
        this.message = message;
        // console.log('canvas', this.message);
      }
    );
  }

  ngOnInit() {
    // console.log('canvas one', this.id);
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }



  renderID(passDown: string): void {
    this.parentID = passDown;
    // console.log('ngc-render', this.parentID, this.id);
  }

  render(): void {
    // console.log('ngc-render - called', this.id);
  }
}
