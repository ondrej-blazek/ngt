import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayersService {
  private layers: any[];

  constructor() {
    this.layers = [];
  }

  // Canvas layers of shapes
  getLayers (renderID: string): string[] {
    return (this.layers[renderID]);
  }
  addToLayers (renderID: string, layerID: string): void {
    if (!this.layers[renderID]) {
      this.layers[renderID] = [];
    }

    this.layers[renderID].push(layerID);

    console.log ('this.layers', this.layers);
  }

}
