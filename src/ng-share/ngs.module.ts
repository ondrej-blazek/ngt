import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgcModule } from '@ngc/ngc.module';
import { NgtModule } from '@ngt/ngt.module';

import { ChronosDirective } from './core/chronos.directive';
import { ChronosService } from './core/chronos.service';

@NgModule({
  imports: [
    CommonModule,
    NgcModule,
    NgtModule
  ],
  declarations: [
    ChronosDirective
  ],
  providers: [
    ChronosService
  ],
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
