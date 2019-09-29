import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgtRenderDirective } from '@ngt/core';
import { SceneDirective, VisionDirective } from '@ngt/render';
import { OrbitDirective, VrDirective, EnvironmentDirective, GeometryDirective, LightDirective } from '@ngt/scene';
import { PerspectiveCameraDirective, OrthoCameraDirective, RaycasterDirective, ProjectorDirective, GltfCameraDataDirective } from '@ngt/camera';
import { PointLightDirective, HemisphereLightDirective, GltfLightDirective } from '@ngt/light';
import { AxesDirective, BackgroundDirective, CubePanoramaDirective,
         DomeDirective, FogDirective, GridDirective, GroundDirective } from '@ngt/environment';
import { ObjectDirective, DynamicDirective, LayerDirective, GltfSceneDirective, GltfMeshDirective } from '@ngt/geometry';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NgtRenderDirective,
    SceneDirective, VisionDirective,
    OrbitDirective, VrDirective, EnvironmentDirective, GeometryDirective, LightDirective,
    PerspectiveCameraDirective, OrthoCameraDirective, RaycasterDirective, ProjectorDirective, GltfCameraDataDirective,
    PointLightDirective, HemisphereLightDirective, GltfLightDirective,
    AxesDirective, BackgroundDirective, CubePanoramaDirective, DomeDirective, FogDirective, GridDirective, GroundDirective,
    ObjectDirective, DynamicDirective, LayerDirective, GltfSceneDirective, GltfMeshDirective
  ],
  providers: [],
  exports: [
    NgtRenderDirective,
    SceneDirective, VisionDirective,
    OrbitDirective, VrDirective, EnvironmentDirective, GeometryDirective, LightDirective,
    PerspectiveCameraDirective, OrthoCameraDirective, RaycasterDirective, ProjectorDirective, GltfCameraDataDirective,
    PointLightDirective, HemisphereLightDirective, GltfLightDirective,
    AxesDirective, BackgroundDirective, CubePanoramaDirective, DomeDirective, FogDirective, GridDirective, GroundDirective,
    ObjectDirective, DynamicDirective, LayerDirective, GltfSceneDirective, GltfMeshDirective
  ]
})

export class NgtModule {}
