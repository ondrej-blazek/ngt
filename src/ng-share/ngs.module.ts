import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChronosDirective } from './core/chronos.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ChronosDirective
  ],
  providers: [],
  exports: [
    ChronosDirective
  ]
})
export class NgsModule {
  /* make sure CoreModule is imported only by one NgModule the AppModule */
  constructor (
    @Optional() @SkipSelf() parentModule: NgsModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
