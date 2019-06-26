import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayersService {
  private layers: any[];
  private activeClicks: any[];

  constructor() {
    this.layers = [];
    this.activeClicks = [];
  }

  // Canvas layers of shapes
  getLayers (renderID: string): string[] {
    return (this.layers[renderID]);
  }
  addToLayers (renderID: string, layerID: string, uuid: string): void {
    const layerObject: any = {};
    layerObject.layerID = layerID;
    layerObject.uuid = uuid;

    if (!this.layers[renderID]) {
      this.layers[renderID] = [];
    }
    this.layers[renderID].push(layerObject);
  }

  // Active Clicks
  // addToActiveLayers (uuid: string): void {
  //   this.activeClicks.push(uuid);
  //   const unique = this.activeClicks.filter((item, i, ar) => ( ar.indexOf(item) === i ));
  //   this.activeClicks = unique;

  //   console.log ('active', this.activeClicks);
  // }

}
