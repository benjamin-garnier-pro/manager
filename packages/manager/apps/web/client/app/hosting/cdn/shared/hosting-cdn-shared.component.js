import controller from './hosting-cdn-shared.controller';
import template from './hosting-cdn-shared-settings.html';

export default {
  controller,
  template,
  bindings: {
    autoPayWithPreferredPaymentMethod: '<',
    catalogAddon: '<',
    checkoutOrderCart: '<',
    goBack: '<',
    goBackWithError: '<',
    isOptionFree: '<',
    prepareOrderCart: '<',
    serviceName: '<',
    serviceOption: '<',
    user: '<',
    hasCDN: '<',
    isV1CDN: '<',
    isIncludedCDN: '<',
    isPayableCDN: '<',
    isV2CDN: '<',
    cdnProperties: '<',
  },
};
