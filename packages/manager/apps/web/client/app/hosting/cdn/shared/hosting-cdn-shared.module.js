import controller from './hosting-cdn-shared.controller';
import service from "./hosting-cdn-shared.service";
import component from './hosting-cdn-shared.component';

const moduleName = 'ovhManagerHostingCdnShared';

angular.module(moduleName, [])
  .component('hostingCdnSharedSettings', component)
  .service('HostingCdnSharedService', service)
  .controller('HostingSharedCdnCtrl', controller);

export default moduleName;
