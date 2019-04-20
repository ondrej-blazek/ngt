import * as THREE from 'three';

export class HemiLightService {
  private location: THREE.Vector3;
  private position: THREE.Vector3;
  private degrees: number;

  public light: THREE.HemisphereLight;

  constructor () {
    this.location = new THREE.Vector3(0, 0, 0);
    this.degrees = THREE.Math.randInt(0,180);
  }
  
  setLight (light: THREE.HemisphereLight):THREE.HemisphereLight {
    // next three lines are the same as this -> new THREE.HemisphereLight( 0xffffff, 0xffffff, 1.1 );
    light.color = new THREE.Color(0xffffff);
    light.skyColor = new THREE.Color(0x0077ff);
    light.groundColor = new THREE.Color(0x5b3b0f);
    light.intensity = 0.7;
    
    return (light);
  }

  setOffset (light: THREE.PointLight, offset:THREE.Vector3):void {
    this.position = this.location.add(offset);
    light.position.set(this.position.x, this.position.y, this.position.z);
  }

  render (light):THREE.HemisphereLight {
    this.degrees ++;
    if (this.degrees === 360) {
      this.degrees = 0;
    }

    let localRadians:number = THREE.Math.degToRad (this.degrees);
    light.position.y = (Math.sin(localRadians) * 60) + 30;
    return (light);
  }
}