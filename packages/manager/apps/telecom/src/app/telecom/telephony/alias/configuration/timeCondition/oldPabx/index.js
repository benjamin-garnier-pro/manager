import angular from 'angular';
import ngOvhTelecomUniverseComponents from '@ovh-ux/ng-ovh-telecom-universe-components';
import '@uirouter/angularjs';
import '@ovh-ux/ng-translate-async-loader';
import 'angular-translate';
import 'ovh-api-services';

import serviceTimeonditionImport from '../../../../service/time-condition/import';
import timeConditionConfigurationComponent from '../../../../../../../components/telecom/telephony/service/time-condition-configuration';
import timeConditionComponent from '../../../../../../../components/telecom/telephony/timeCondition';

import routing from './old-pabx.routing';

const moduleName =
  'ovhManagerTelecomTelephonyAliasConfiguratioTimeConditionOldPabx';

angular
  .module(moduleName, [
    ngOvhTelecomUniverseComponents,
    'ngTranslateAsyncLoader',
    'pascalprecht.translate',
    'ovh-api-services',
    'ui.router',
    serviceTimeonditionImport,
    timeConditionConfigurationComponent,
    timeConditionComponent,
  ])
  .config(routing)
  .run(/* @ngTranslationsInject:json ./translations */);

export default moduleName;
