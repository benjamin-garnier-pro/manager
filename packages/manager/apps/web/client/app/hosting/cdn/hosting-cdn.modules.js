import routing from './hosting-cdn.routing';

import flush from './flush/hosting-cdn-flush.module';
import order from './order/hosting-cdn-order.module';
import terminate from './terminate/hosting-cdn-terminate.module';
import shared from './shared/hosting-cdn-shared.module';

const moduleName = 'ovhManagerHostingCdn';

angular
  .module(moduleName, [flush, order, terminate, shared]).config(routing);

export default moduleName;
