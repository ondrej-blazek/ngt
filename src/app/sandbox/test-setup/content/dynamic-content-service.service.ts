import { SphereContentServiceService } from './sphere-content-service.service';

export class DynamicContentServiceService {
  private location: number[];    // THREE.Vector3
  private rotation: number[];    // THREE.Euler
  private scale: number[];       // THREE.Vector3
  public objectArray: SphereContentServiceService[];

  constructor() {
    this.location = [0, 0, 0];
    this.rotation = [0, 0, 0];
    this.scale = [0, 0, 0];
    this.objectArray = [];

    this.setAllObjects ();
  }

  setLocation (location:number[]):void {
    this.location = location;
    // this.object.position.set(location[0], location[1], location[2]);
  }

  setRotation (rotation:number[]):void {
    this.rotation = rotation;
    // this.object.rotation.set(THREE.Math.degToRad (rotation[0]), THREE.Math.degToRad (rotation[1]), THREE.Math.degToRad (rotation[2]), 'XYZ');
  }

  setAllObjects ():void {
    for (let x=1; x<=10; x++) {
      for (let z=1; z<=10; z++) {
        let sp:SphereContentServiceService = new SphereContentServiceService();
        sp.setLocation([(x*15)-75,10,(z*15)-75]);
        sp.setDegrees(x*z*5);

        // sp.id = sp.object.id;      // TODO - Add this to all important places
        // sp.uuid = sp.object.uuid;  // TODO - Add this to all important places
        this.objectArray.push(sp);
      }
    }
  }

  render(): void {
    this.objectArray.forEach(element => {
      element.render();
    });
  }
}
