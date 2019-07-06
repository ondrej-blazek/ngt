import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgcModule } from '@ngc/ngc.module';
import { NgtModule } from '@ngt/ngt.module';

import { ChronosService } from './core/chronos.service';
import { ChronosDirective } from './core/chronos.directive';
import { ReporterDirective } from './core/reporter.directive';

@NgModule({
  imports: [
    CommonModule,
    NgcModule,
    NgtModule
  ],
  declarations: [
    ChronosDirective,
    ReporterDirective
  ],
  providers: [
    ChronosService
  ],
  exports: [
    ChronosDirective,
    ReporterDirective
  ]
})
export class NgsModule {
  /* make sure CoreModule is imported only by one NgModule the AppModule */
  // constructor (
  //   @Optional() @SkipSelf() parentModule: NgsModule
  // ) {
  //   if (parentModule) {
  //     throw new Error('CoreModule is already loaded. Import only in AppModule');
  //   }
  // }
}
