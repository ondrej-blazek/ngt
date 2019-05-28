import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Local setup
import { CarComponent } from './car/car.component';
import { DancerComponent } from './dancer/dancer.component';

const routes: Routes = [
  {
    path: 'car',
    component: CarComponent,
    resolve: {}
  },
  {
    path: 'dancer',
    component: DancerComponent,
    resolve: {}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoRoutingModule { }
