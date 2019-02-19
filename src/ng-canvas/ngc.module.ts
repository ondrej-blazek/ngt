import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgcRenderDirective } from './core/ngc-render.directive';
import { TestContDirective } from './content/test-cont.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NgcRenderDirective,
    TestContDirective
  ],
  providers: [],
  exports: [
    NgcRenderDirective,
    TestContDirective
  ]
})
export class NgcModule {
  /* make sure CoreModule is imported only by one NgModule the AppModule */
  constructor (
    @Optional() @SkipSelf() parentModule: NgcModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
