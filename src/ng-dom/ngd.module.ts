// NG core and NPM
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgdRenderDirective, NgdCloseEventDirective } from './core';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NgdRenderDirective,
    NgdCloseEventDirective
  ],
  providers: [],
  exports: [
    NgdRenderDirective,
    NgdCloseEventDirective
  ]
})
export class NgdModule { }
