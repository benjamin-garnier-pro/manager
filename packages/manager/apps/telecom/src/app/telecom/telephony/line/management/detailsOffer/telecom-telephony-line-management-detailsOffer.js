angular
  .module('managerApp')
  .config(($stateProvider) => {
    $stateProvider.state(
      'telecom.telephony.billingAccount.line.dashboard.detailsOffer',
      {
        url: '/detailsOffer',
        views: {
          'lineView@telecom.telephony.billingAccount.line.dashboard': {
            templateUrl:
              'app/telecom/telephony/line/management/detailsOffer/telecom-telephony-line-management-detailsOffer.html',
          },
          'detailsView@telecom.telephony.billingAccount.line.dashboard.detailsOffer': {
            templateUrl:
              'app/telecom/telephony/line/details/telecom-telephony-line-details.html',
            controller: 'TelecomTelephonyLineDetailsCtrl',
            controllerAs: '$ctrl',
          },
        },
        resolve: {
          breadcrumb: /* @ngInject */ ($translate) =>
            $translate.instant('telephony_line_details_title'),
        },
      },
    );
  })
  .run(/* @ngTranslationsInject:json ./translations */);
