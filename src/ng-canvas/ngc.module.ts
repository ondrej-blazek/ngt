import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
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
