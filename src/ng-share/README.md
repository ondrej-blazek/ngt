# ng-share

## Synchronzation of all included elements

All major section are synchronized through this component in order listed: ng-three, ng-canvas and ng-dom.

*chronos.directive.ts* - Purpose of this directive is only to propagate events triggered by `requestAnimationFrame` provided by browser. This event is then propagated by internal process to children components. This ensures that 3D layer is first to update, then interactive layer of Canvas then html are trigegered with update event.

*chronos.service.ts* - Provides means of communication in between components within ng-share realm. Communication to outside application is handled by two way binding provided by Angular framework.

*reporter.directive.ts* - This directive is attached to parent element of ngs-chronos directive, to provide information from/about browser and events that were initiated by user. 
