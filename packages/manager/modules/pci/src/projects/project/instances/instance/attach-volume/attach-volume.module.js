import angular from 'angular';
import '@ovh-ux/ng-translate-async-loader';
import '@uirouter/angularjs';
import 'angular-translate';
import '@ovh-ux/ui-kit';
import 'ovh-api-services';

import component from './attach-volume.component';
import routing from './attach-volume.routing';

const moduleName = 'ovhManagerPciInstancesInstanceAttachVolume';

angular
  .module(moduleName, [
    'ui.router',
    'oui',
    'ovh-api-services',
    'ngTranslateAsyncLoader',
    'pascalprecht.translate',
  ])
  .config(routing)
  .component('pciInstancesInstanceAttachVolume', component)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
