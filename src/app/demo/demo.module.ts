import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoRoutingModule } from './demo-routing.module';

// NGT base code
import { NgsModule } from '@ngs/ngs.module';
import { NgcModule } from '@ngc/ngc.module';
import { NgtModule } from '@ngt/ngt.module';
import { NgdModule } from '@ngd/ngd.module';

// Local setup
import { CarComponent } from './car/car.component';
import { DancerComponent } from './dancer/dancer.component';
import { HelmetComponent } from './helmet/helmet.component';
import { CthulhuComponent } from './cthulhu/cthulhu.component';
import { DatsunComponent } from './datsun/datsun.component';

@NgModule({
  declarations: [
    CarComponent,
    DancerComponent,
    HelmetComponent,
    CthulhuComponent,
    DatsunComponent
  ],
  imports: [
    CommonModule,
    NgsModule,
    NgcModule,
    NgtModule,
    NgdModule,
    DemoRoutingModule
  ]
})
export class DemoModule { }
