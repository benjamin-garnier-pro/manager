import angular from 'angular';

import '@ovh-ux/manager-core';
import '@ovh-ux/ng-ovh-cloud-universe-components';
import '@uirouter/angularjs';
import 'angular-translate';

import './logs-order.less';

import component from './order.component';
import listHeader from '../header/list/list.module';
import routing from './order.routing';

const moduleName = 'ovhManagerDbaasLogsOrder';

angular
  .module(moduleName, [
    'ngOvhCloudUniverseComponents',
    'ovhManagerCore',
    'pascalprecht.translate',
    'ui.router',
    listHeader,
    'ngOvhDocUrl',
  ])
  .config(routing)
  .component('dbaasLogsOrder', component);

export default moduleName;
