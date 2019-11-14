import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Local setup
import { PageCanvasComponent } from './pages/page-canvas/page-canvas.component';
import { PageCombinedComponent } from './pages/page-combined/page-combined.component';
import { PageGltfComponent } from './pages/page-gltf/page-gltf.component';
import { PageGltfLightsComponent } from './pages/page-gltf-lights/page-gltf-lights.component';
import { PageGltfUploadComponent } from './pages/page-gltf-upload/page-gltf-upload.component';
import { PageInterCanvasComponent } from './pages/page-inter-canvas/page-inter-canvas.component';
import { PageInterHtmlComponent } from './pages/page-inter-html/page-inter-html.component';
import { PageSetupComponent } from './pages/page-setup/page-setup.component';

const routes: Routes = [
  {
    path: 'test-canvas',
    component: PageCanvasComponent,
    resolve: {}
  },
  {
    path: 'test-setup',
    component: PageSetupComponent,
    resolve: {}
  },
  {
    path: 'test-interactive-canvas',
    component: PageInterCanvasComponent,
    resolve: {}
  },
  {
    path: 'test-interactive-html',
    component: PageInterHtmlComponent,
    resolve: {}
  },
  {
    path: 'test-combined',
    component: PageCombinedComponent,
    resolve: {}
  },
  {
    path: 'test-gltf',
    component: PageGltfComponent,
    resolve: {}
  },
  {
    path: 'test-gltf-lights',
    component: PageGltfLightsComponent,
    resolve: {}
  },
  {
    path: 'test-gltf-upload',
    component: PageGltfUploadComponent,
    resolve: {}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SandboxRoutingModule { }
