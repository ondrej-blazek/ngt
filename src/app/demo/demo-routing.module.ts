import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Local setup
import { PageCarComponent } from './pages/page-car/page-car.component';
import { PageCthulhuComponent } from './pages/page-cthulhu/page-cthulhu.component';
import { PageDancerComponent } from './pages/page-dancer/page-dancer.component';
import { PageDatsunComponent } from './pages/page-datsun/page-datsun.component';
import { PageHelmetComponent } from './pages/page-helmet/page-helmet.component';

const routes: Routes = [
  {
    path: 'car',
    component: PageCarComponent,
    resolve: {}
  },
  {
    path: 'dancer',
    component: PageDancerComponent,
    resolve: {}
  },
  {
    path: 'helmet',
    component: PageHelmetComponent,
    resolve: {}
  },
  {
    path: 'cthulhu',
    component: PageCthulhuComponent,
    resolve: {}
  },
  {
    path: 'datsun',
    component: PageDatsunComponent,
    resolve: {}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoRoutingModule { }
