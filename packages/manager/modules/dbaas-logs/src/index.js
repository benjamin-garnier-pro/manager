import angular from 'angular';

import '@ovh-ux/manager-core';
import '@ovh-ux/ng-at-internet';
import '@uirouter/angularjs';
import 'angular-translate';

import logs from './logs/logs.module';

const moduleName = 'ovhManagerDbaasLogs';

angular
  .module(moduleName, [
    'ovhManagerCore',
    'ngAtInternet',
    'pascalprecht.translate',
    'ui.router',
    logs,
  ])
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
