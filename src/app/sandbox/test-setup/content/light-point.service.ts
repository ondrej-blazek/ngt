import * as THREE from 'three';

export class PointLightService {
  private location: THREE.Vector3;
  private position: THREE.Vector3;
  private degrees: number;

  public light: THREE.PointLight;

  constructor () {
    this.location = new THREE.Vector3(0, 0, 0);
    this.degrees = THREE.Math.randInt(0, 180);
  }

  setLight (light: THREE.PointLight): THREE.PointLight {
    // next four lines are the same as this -> new THREE.PointLight( 0xffffff, 1.5, 200, 2 );
    light.color = new THREE.Color(0xffffff);
    light.intensity = 1.5;
    light.distance = 200;
    light.decay = 2;

    // Light options and params
    light.castShadow = true;
    light.shadow.mapSize.width = 1024;      // 2048 WILL choke GPU
    light.shadow.mapSize.height = 1024;     // 2048 WILL choke GPU
    light.shadow.camera.far = 3500;
    light.shadow.bias = -0.0001;

    return (light);
  }

  setOffset (light: THREE.PointLight, offset: THREE.Vector3): void {
    this.position = this.location.add(offset);
    light.position.set(this.position.x, this.position.y, this.position.z);
  }

  render (light): THREE.PointLight {
    this.degrees ++;
    if (this.degrees === 360) {
      this.degrees = 0;
    }

    const localRadians: number = THREE.Math.degToRad (this.degrees);
    light.position.y = (Math.sin(localRadians) * 100) + 100;
    return (light);
  }
}
