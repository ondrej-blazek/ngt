import { Directive, ContentChild, ContentChildren, Input } from '@angular/core';
import * as THREE from 'three';

// import { PointLightDirective, HemisphereLightDirective } from '@app/core/light';
import { CameraDirective } from '@ngt/camera';
// import { EnvironmentDirective } from './environment.directive';
// import { GeometryDirective } from './geometry.directive';
// import { DynamicGeometryDirective } from './dynamic-geometry.directive';

@Directive({
  selector: 'ngt-scene'
})
export class SceneDirective {
  // element parameters 
  @Input() helpers: boolean = false;

  // child components / directives
  // @ContentChildren(PointLightDirective) pointlightDirective: any;
  // @ContentChildren(HemisphereLightDirective) hemispherelightDirective: any;
  
  @ContentChild(CameraDirective) cameraDirective: any;
  // @ContentChild(EnvironmentDirective) environmentDirective: any;
  // @ContentChild(GeometryDirective) geometryDirective: any;
  // @ContentChild(DynamicGeometryDirective) dynamicGeometryDirective: any;


  // private axesHelper: THREE.AxesHelper;
  // private gridHelper: THREE.GridHelper;
  // private cameraHelper: THREE.CameraHelper;
  // private pointLightHelperArr: THREE.PointLightHelper[] = [];
  // private hemisphereLightHelperArr: THREE.HemisphereLightHelper[] = [];
  
  public scene: THREE.Scene = new THREE.Scene();

  get camera() {
    return this.cameraDirective.camera;
  }
  // get environment() {
  //   return this.environmentDirective;
  // }
  // get geometry() {
  //   return this.geometryDirective;
  // }
  // get dynamicGeometry() {
  //   return this.dynamicGeometryDirective;
  // }

  constructor() { }

  ngOnInit() {
    // Pass this scene handler to geometry directive
    // if (this.environmentDirective)        this.environmentDirective.setScene(this.scene);
    // if (this.geometryDirective)           this.geometryDirective.setScene(this.scene);
    // if (this.dynamicGeometryDirective)    this.dynamicGeometryDirective.setScene(this.scene);
  }

  ngOnDestroy():void {
    // console.info ('SceneDirective - ngOnDestroy');
    // this.scene.remove();
  }

  ngOnChanges(changes) {
    // if(changes.helpers) {
    //   this.helpers = changes.helpers.currentValue;

    //   if (this.axesHelper) this.axesHelper.visible = this.helpers;
    //   if (this.gridHelper) this.gridHelper.visible = this.helpers;
    //   if (this.cameraHelper) this.cameraHelper.visible = this.helpers;

    //   if (this.pointLightHelperArr.length > 0) {
    //     for(let onePointHlp of this.pointLightHelperArr) {
    //       onePointHlp.visible = this.helpers;
    //     }
    //   }
      
    //   if (this.hemisphereLightHelperArr.length > 0) {
    //     for(let oneHemiHlp of this.hemisphereLightHelperArr) {
    //       oneHemiHlp.visible = this.helpers;
    //     }
    //   }
    // }
  }

  ngAfterContentInit() {
    // Scene
    // this.scene.background = new THREE.Color().setHSL( 0.6, 0, 1 );
    // this.scene.fog = new THREE.Fog( this.scene.background, 1, 1000 );
    // ERROR in src/app/core/scene/scene.directive.ts(87,37): error TS2345: Argument of type 'Color' is not assignable to parameter of type 'number'.

    // // Camera
    // this.camera.lookAt(this.scene.position);
    // this.scene.add(this.camera);

    // this.cameraHelper = new THREE.CameraHelper( this.camera );
    // this.cameraHelper.visible = this.helpers;
    // this.scene.add( this.cameraHelper );

    // // ThreeJS Helper objects
    // this.axesHelper = new THREE.AxesHelper(200);
    // this.axesHelper.visible = this.helpers;
    // this.scene.add (this.axesHelper);

    // this.gridHelper = new THREE.GridHelper(1200, 60);
    // this.gridHelper.visible = this.helpers;
    // this.scene.add (this.gridHelper);

    // // Light(s)
    // let pointlightDirectives: PointLightDirective[] = this.pointlightDirective.toArray();
    // for(let oneDirective of pointlightDirectives) {
    //   this.scene.add(oneDirective.light);

    //   let dirLightHeper = new THREE.PointLightHelper( oneDirective.light, 5 );
    //   dirLightHeper.visible = this.helpers;
    //   this.scene.add( dirLightHeper );
    //   this.pointLightHelperArr.push( dirLightHeper );
    // }
    
    // let hemispherelightDirectives: HemisphereLightDirective[] = this.hemispherelightDirective.toArray();
    // for(let oneDirective of hemispherelightDirectives) {
    //   this.scene.add(oneDirective.light);

    //   let dirLightHeper = new THREE.HemisphereLightHelper( oneDirective.light, 10 );
    //   dirLightHeper.visible = this.helpers;
    //   this.scene.add( dirLightHeper );
    //   this.hemisphereLightHelperArr.push( dirLightHeper );
    // }
  }
}
