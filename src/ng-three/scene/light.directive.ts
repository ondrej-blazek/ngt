import { OnInit, Directive, ContentChildren, QueryList, AfterContentInit, Input } from '@angular/core';
import { PointLightDirective, HemisphereLightDirective } from '@ngt/light';

@Directive({
  selector: 'ngt-light'
})
export class LightDirective implements OnInit, AfterContentInit {
  // element parameters 
  @Input() helpers: boolean = false;

  // child components / directives
  @ContentChildren(PointLightDirective) pointLightDomQuery: QueryList<PointLightDirective>;
  @ContentChildren(HemisphereLightDirective) hemiLightDomQuery: QueryList<HemisphereLightDirective>;

  private scene: THREE.Scene;
  private parentID: string;

  // private pointLightHelperArr: THREE.PointLightHelper[] = [];
  // private hemisphereLightHelperArr: THREE.HemisphereLightHelper[] = [];

  private pointLightDirectives: PointLightDirective[] = [];
  private hemiLightDirectives: HemisphereLightDirective[] = [];

  constructor() {
    this.parentID = '';
  }

  ngOnChanges(changes) {
    if(changes.helpers) {
      this.helpers = changes.helpers.currentValue;

      // if (this.cameraHelper) this.cameraHelper.visible = this.helpers;

      // if (this.pointLightHelperArr.length > 0) {
      //   for(let onePointHlp of this.pointLightHelperArr) {
      //     onePointHlp.visible = this.helpers;
      //   }
      // }
      
      // if (this.hemisphereLightHelperArr.length > 0) {
      //   for(let oneHemiHlp of this.hemisphereLightHelperArr) {
      //     oneHemiHlp.visible = this.helpers;
      //   }
      // }
    }
  }


  ngOnInit() {}
  
  ngAfterContentInit() {
    this.pointLightDirectives = this.pointLightDomQuery.toArray();
    this.hemiLightDirectives = this.hemiLightDomQuery.toArray();

    for(let oneDirective of this.pointLightDirectives) {
      this.scene.add(oneDirective.light);
    }

    for(let oneDirective of this.hemiLightDirectives) {
      this.scene.add(oneDirective.light);
    }

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

  renderID(passDown: string): void {
    this.parentID = passDown;
  }

  setScene (masterScene:THREE.Scene):void {
    this.scene = masterScene;
  }

  propagateID(passDown: string) {
    // for (const onePointLight of this.pointlightDirective) {
    //   onePointLight.renderID(passDown);
    // }
    // for (const oneHemispherelight of this.hemispherelightDirective) {
    //   oneHemispherelight.renderID(passDown);
    // }
  }

  propagateRender (): void {
    for(let oneDirective of this.pointLightDirectives) {
      // oneDirective.render();
    }
    for(let oneDirective of this.hemiLightDirectives) {
      // oneDirective.render();
    }
  }

  // TODO - make lights animated and support render
  // TODO - Make lights into independents classes/content
  render(): void {
    // this.propagateRender();
  }
}

// TODO - Bring helper objects from scene and make them conditional