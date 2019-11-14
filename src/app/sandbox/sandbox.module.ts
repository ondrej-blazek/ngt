import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SandboxRoutingModule } from './sandbox-routing.module';

// NGT base code
import { NgsModule } from '@ngs/ngs.module';
import { NgcModule } from '@ngc/ngc.module';
import { NgtModule } from '@ngt/ngt.module';
import { NgdModule } from '@ngd/ngd.module';

// Local setup
import { TestCanvasComponent } from './test-canvas/test-canvas.component';
import { TestSetupComponent } from './test-setup/test-setup.component';
import { TestCombinedComponent } from './test-combined/test-combined.component';
import { TestInterCanvasComponent } from './test-inter-canvas/test-inter-canvas.component';
import { TestInnerHTMLComponent } from './test-inter-html/test-inter-html.component';
import { TestGLTFComponent } from './test-gltf/test-gltf.component';
import { TestGLTFLightsComponent } from './test-gltf-lights/test-gltf-lights.component';
import { TestGltfUploadComponent } from './test-gltf-upload/test-gltf-upload.component';

import { UiLayersComponent } from './test-combined/ui-layers/ui-layers.component';
import { UiCamerasComponent } from './test-gltf-lights/ui-cameras/ui-cameras.component';

import { PageCanvasComponent } from './pages/page-canvas/page-canvas.component';
import { PageCombinedComponent } from './pages/page-combined/page-combined.component';
import { PageGltfComponent } from './pages/page-gltf/page-gltf.component';
import { PageGltfLightsComponent } from './pages/page-gltf-lights/page-gltf-lights.component';
import { PageGltfUploadComponent } from './pages/page-gltf-upload/page-gltf-upload.component';
import { PageInterHtmlComponent } from './pages/page-inter-html/page-inter-html.component';
import { PageInterCanvasComponent } from './pages/page-inter-canvas/page-inter-canvas.component';
import { PageSetupComponent } from './pages/page-setup/page-setup.component';

@NgModule({
  declarations: [
    TestCanvasComponent,
    TestSetupComponent,
    TestCombinedComponent,
    TestInterCanvasComponent,
    TestInnerHTMLComponent,
    TestGLTFComponent,
    TestGLTFLightsComponent,
    TestGltfUploadComponent,
    UiLayersComponent,
    UiCamerasComponent,
    PageCanvasComponent,
    PageCombinedComponent,
    PageGltfComponent,
    PageGltfLightsComponent,
    PageGltfUploadComponent,
    PageInterHtmlComponent,
    PageInterCanvasComponent,
    PageSetupComponent
  ],
  imports: [
    CommonModule,
    NgsModule,
    NgcModule,
    NgtModule,
    NgdModule,
    SandboxRoutingModule
  ]
})
export class SandboxModule { }
