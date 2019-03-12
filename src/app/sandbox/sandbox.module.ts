import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SandboxRoutingModule } from './sandbox-routing.module';

// NGT base code
import { NgsModule } from '@ngs/ngs.module';
import { NgcModule } from '@ngc/ngc.module';
import { NgtModule } from '@ngt/ngt.module';

// Local setup
import { TestCanvasComponent } from './test-canvas/test-canvas.component';
import { TestSetupComponent } from './test-setup/test-setup.component';

@NgModule({
  declarations: [
    TestCanvasComponent,
    TestSetupComponent
  ],
  imports: [
    CommonModule,
    NgsModule,
    NgcModule,
    NgtModule,
    SandboxRoutingModule
  ]
})
export class SandboxModule { }
