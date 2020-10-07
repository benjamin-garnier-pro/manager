import controller from './hosting-cdn-shared.controller';
import service from "./hosting-cdn-shared.service";

const moduleName = 'ovhManagerHostingCdnShared';

angular.module(moduleName, [])
  .service('HostingCdnSharedService', service)
  .controller('HostingSharedCdnCtrl', controller);

export default moduleName;
