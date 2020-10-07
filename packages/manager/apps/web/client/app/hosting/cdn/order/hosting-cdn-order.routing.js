import find from 'lodash/find';
import get from 'lodash/get';

export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('app.hosting.cdn.order', {
    url: '/order',
    component: 'hostingCdnOrder',
    resolve: {
      /* @ngInject */
      autoPayWithPreferredPaymentMethod: (ovhPaymentMethod) =>
        ovhPaymentMethod.hasDefaultPaymentMethod(),

      catalogAddon: /* @ngInject */ (
        goBackWithError,
        serviceOption,
        user,
        $translate,
        HostingCdnOrderService,
      ) =>
        HostingCdnOrderService.getCatalogAddon(
          user.ovhSubsidiary,
          serviceOption,
        ).catch((error) => goBackWithError(get(error, 'data.message', error))),

      checkoutOrderCart: /* @ngInject */ (
        goBack,
        goBackWithError,
        isOptionFree,
        $translate,
        $window,
        HostingCdnOrderService,
      ) => async (autoPayWithPreferredPaymentMethod, cartId) => {
        try {
          const order = await HostingCdnOrderService.checkoutOrderCart(
            isOptionFree || autoPayWithPreferredPaymentMethod,
            cartId,
          );

          if (isOptionFree) {
            goBack(
              $translate.instant(
                'hosting_dashboard_cdn_order_success_activation',
              ),
            );
          } else {
            $window.open(order.url, '_blank');
            goBack(
              $translate.instant('hosting_dashboard_cdn_order_success', {
                t0: order.url,
              }),
            );
          }
        } catch (error) {
          goBackWithError(get(error, 'data.message', error));
        }
      },

      goBack: /* @ngInject */ (goToHosting) => goToHosting,

      goBackWithError: /* @ngInject */ ($translate, goBack) => (error) =>
        goBack(
          $translate.instant('hosting_dashboard_cdn_order_error', {
            message: error,
          }),
          'danger',
        ),

      isOptionFree: /* @ngInject */ (serviceOption) =>
        serviceOption.planCode === 'cdn_free_business',

      prepareOrderCart: /* @ngInject */ (
        goBackWithError,
        serviceName,
        serviceOption,
        user,
        $translate,
        HostingCdnOrderService,
      ) => async () => {
        try {
          const cartId = await HostingCdnOrderService.prepareOrderCart(
            user.ovhSubsidiary,
          );
          const cart = await HostingCdnOrderService.addItemToCart(
            cartId,
            serviceName,
            serviceOption,
          );

          return { cart, cartId };
        } catch (error) {
          goBackWithError(get(error, 'data.message', error));

          return {};
        }
      },

      serviceName: /* @ngInject */ ($transition$) =>
        $transition$.params().productId,

      serviceOption: /* @ngInject */ (availableOptions, goBackWithError) =>
        find(availableOptions, { family: 'cdn' }) ||
        goBackWithError('No serviceOption found'),

      cdnProperties: /* @ngInject */ (HostingCdnSharedService, serviceName) => {
        return HostingCdnSharedService
          .getCDNProperties(serviceName)
          .then((cdn) => {
            console.log('ZM:: cdnProperties.then', cdn);
            return cdn;
          })
          .catch((err) => {
            console.log('ZM:: cdnProperties.catch', err);
            return null;
            /*
            NO: null

            v1 included: {domain: "agora6.ovh",
              free: true,
              status: "created",
              taskId: null,
              type: "business",
              version: "2013v1"}

            v1 payable: {domain: "agora6.ovh",
              free: false,
              status: "created",
              taskId: null,
              type: "business",
              version: "2013v1"}

            V2: {domain: "wyupvok.cluster026.hosting.ovh.net"
              taskId: null,
              version: "v2",
              free: false,
              type: "cdn-basic",
              status: "created"}

            */
          })
      },

      hasCDN: /* @ngInject */ (cdnProperties) => cdnProperties !== null,

      isV1CDN: /* @ngInject */ (cdnProperties, hasCDN) => hasCDN && cdnProperties.version === '2013v1',

      isIncludedCDN: /* @ngInject */ (cdnProperties, isV1CDN) => isV1CDN && cdnProperties.free,

      isPayableCDN: /* @ngInject */ (cdnProperties, isV1CDN) => isV1CDN && !cdnProperties.free,

      isV2CDN: /* @ngInject */ (cdnProperties, hasCDN) => hasCDN && cdnProperties.version === 'v2',

    },
  });
};
