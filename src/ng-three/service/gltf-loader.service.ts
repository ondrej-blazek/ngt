import { Injectable } from '@angular/core';
import { ObjectService } from './object.service';

@Injectable({
  providedIn: 'root'
})
export class GltfLoaderService extends ObjectService {
  constructor() {
    super();
  }
}
