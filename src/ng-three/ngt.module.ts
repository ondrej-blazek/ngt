import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgtRenderDirective } from '@ngt/core';
import { SceneDirective, OrbitDirective, VrDirective, EnvironmentDirective, GeometryDirective, LightDirective } from '@ngt/scene';
import { PerspectiveCameraDirective, OrthoCameraDirective, RaycasterDirective, ProjectorDirective } from '@ngt/camera';
import { PointLightDirective, HemisphereLightDirective } from '@ngt/light';
import { AxesDirective, BackgroundDirective, CubePanoramaDirective,
         DomeDirective, FogDirective, GridDirective, GroundDirective } from '@ngt/environment';
import { ObjectDirective, DynamicDirective, LayerDirective, GltfSceneDirective, GltfMeshDirective } from '@ngt/geometry';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NgtRenderDirective,
    SceneDirective, OrbitDirective, VrDirective, EnvironmentDirective, GeometryDirective, LightDirective,
    PerspectiveCameraDirective, OrthoCameraDirective, RaycasterDirective, ProjectorDirective,
    PointLightDirective, HemisphereLightDirective,
    AxesDirective, BackgroundDirective, CubePanoramaDirective, DomeDirective, FogDirective, GridDirective, GroundDirective,
    ObjectDirective, DynamicDirective, LayerDirective, GltfSceneDirective, GltfMeshDirective
  ],
  providers: [],
  exports: [
    NgtRenderDirective,
    SceneDirective, OrbitDirective, VrDirective, EnvironmentDirective, GeometryDirective, LightDirective,
    PerspectiveCameraDirective, OrthoCameraDirective, RaycasterDirective, ProjectorDirective,
    PointLightDirective, HemisphereLightDirective,
    AxesDirective, BackgroundDirective, CubePanoramaDirective, DomeDirective, FogDirective, GridDirective, GroundDirective,
    ObjectDirective, DynamicDirective, LayerDirective, GltfSceneDirective, GltfMeshDirective
  ]
})
export class NgtModule {
  /* make sure CoreModule is imported only by one NgModule the AppModule */
  // constructor (
  //   @Optional() @SkipSelf() parentModule: NgtModule
  // ) {
  //   if (parentModule) {
  //     throw new Error('CoreModule is already loaded. Import only in AppModule');
  //   }
  // }
}
