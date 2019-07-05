// NG core and NPM
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgdRenderDirective } from './core/ngd-render.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NgdRenderDirective
  ],
  providers: [],
  exports: [
    NgdRenderDirective
  ]
})
export class NgdModule { }
