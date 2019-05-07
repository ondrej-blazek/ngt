import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgcRenderDirective } from '@ngc/core';
import { ShapeDirective } from '@ngc/format';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NgcRenderDirective,
    ShapeDirective
  ],
  providers: [],
  exports: [
    NgcRenderDirective,
    ShapeDirective
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
