import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgtRenderDirective } from '@ngt/core';
import { SceneDirective, OrbitDirective, VrDirective, EnvironmentDirective, GeometryDirective } from '@ngt/scene';
import { CameraDirective } from '@ngt/camera';
import { PointLightDirective, HemisphereLightDirective } from '@ngt/light';
import { GroundDirective, DomeDirective } from '@ngt/environment/';
import { ObjectDirective, DynamicDirective } from '@ngt/geometry';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NgtRenderDirective,
    SceneDirective,
    OrbitDirective,
    VrDirective,
    EnvironmentDirective,
    GeometryDirective,
    CameraDirective,
    PointLightDirective,
    HemisphereLightDirective,
    GroundDirective,
    DomeDirective,
    ObjectDirective,
    DynamicDirective
  ],
  providers: [],
  exports: [
    NgtRenderDirective,
    SceneDirective,
    OrbitDirective,
    VrDirective,
    EnvironmentDirective,
    GeometryDirective,
    CameraDirective,
    PointLightDirective,
    HemisphereLightDirective,
    GroundDirective,
    DomeDirective,
    ObjectDirective,
    DynamicDirective
  ]
})
export class NgtModule {
  /* make sure CoreModule is imported only by one NgModule the AppModule */
  constructor (
    @Optional() @SkipSelf() parentModule: NgtModule
  ) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
