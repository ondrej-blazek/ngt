import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgtRenderDirective } from '@ngt/core';
import { SceneDirective, OrbitDirective, VrDirective, EnvironmentDirective, GeometryDirective, LightDirective } from '@ngt/scene';
import { CameraDirective, RaycasterDirective, ProjectorDirective } from '@ngt/camera';
import { PointLightDirective, HemisphereLightDirective } from '@ngt/light';
import { AxesDirective, BackgroundDirective, DomeDirective, FogDirective, GridDirective, GroundDirective } from '@ngt/environment';
import { ObjectDirective, DynamicDirective } from '@ngt/geometry';
// import { ObjectService } from '@ngt/service';

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
    LightDirective,
    CameraDirective,
    RaycasterDirective,
    ProjectorDirective,
    PointLightDirective,
    HemisphereLightDirective,
    AxesDirective,
    BackgroundDirective,
    DomeDirective,
    FogDirective,
    GridDirective,
    GroundDirective,
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
    LightDirective,
    CameraDirective,
    RaycasterDirective,
    ProjectorDirective,
    PointLightDirective,
    HemisphereLightDirective,
    AxesDirective,
    BackgroundDirective,
    DomeDirective,
    FogDirective,
    GridDirective,
    GroundDirective,
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
