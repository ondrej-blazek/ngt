import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgtRenderDirective } from './core/ngt-render.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NgtRenderDirective
  ],
  providers: [],
  exports: [
    NgtRenderDirective
  ]
})
export class NgtModule {
  /* make sure CoreModule is imported only by one NgModule the AppModule */
  constructor (
    @Optional() @SkipSelf() parentModule: NgtModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
