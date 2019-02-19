import { Directive, Input } from '@angular/core';
import { Subscription } from 'rxjs';

import { ChronosService } from '@ngs/core/chronos.service';

@Directive({
  selector: 'ngt-render'     // tslint:disable-line
})
export class NgtRenderDirective {
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
      }
    );
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  renderID(passDown: string): void {
    this.parentID = passDown;
  }

  render(): void {
    // console.log ('ngt-render - called', this.id);
  }
}
