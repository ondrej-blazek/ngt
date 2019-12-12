# ng-share

## Synchronzation of all included elements

All major section are synchronized through this component in order listed: ng-three, ng-canvas and ng-dom.
*chronos.directive* - purpose of this directive is only to propagate events triggered by `requestAnimationFrame` provided by browser. This event is then propagated by internal process to children components. This ensures that 3D layer is first to update, then interactive layer of Canvas then html are trigegered with update event.
