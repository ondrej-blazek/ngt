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
  private subscription: Subscription;

  constructor(
    private chronosService: ChronosService
  ) {
    // subscribe to home component messages
    this.subscription = this.chronosService.getMessage().subscribe(
      message => {
        this.message = message;
        console.log('canvas ', this.message);
      }
    );
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

  render(): void {
    console.log('ngc-render - called', this.id);
  }
}
