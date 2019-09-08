import { DynamicService } from '@ngt/service';

export class DynamicContentServiceService extends DynamicService {
  constructor () {
    super();
  }

  // User interaction
  userSetActiveObject(element: any): void {
    if (element.object.material.color === element.clickedColor || element.object.material.color === element.clickedHighlightColor) {
      element.object.material.color = element.clickedHighlightColor;
    } else {
      element.object.material.color = element.highlightColor;
    }
  }

  userClearActiveObject(element: any): void {
    if (element.object.material.color === element.clickedColor || element.object.material.color === element.clickedHighlightColor) {
      element.object.material.color = element.clickedColor;
    } else {
      element.object.material.color = element.defaultColor;
    }
  }

  userSetClickedObject(element: any): void {
    element.object.material.color = element.clickedColor;
  }

  userClearClickedObject(element: any): void {
    element.object.material.color = element.defaultColor;
  }
}
