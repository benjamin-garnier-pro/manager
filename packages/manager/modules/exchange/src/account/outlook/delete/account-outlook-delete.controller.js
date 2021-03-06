export default class ExchangeAccountOutlookDelete {
  /* @ngInject */
  constructor(
    $scope,
    Exchange,
    exchangeAccountOutlook,
    messaging,
    navigation,
    $translate,
  ) {
    this.$scope = $scope;

    this.Exchange = Exchange;
    this.exchangeAccountOutlook = exchangeAccountOutlook;
    this.messaging = messaging;
    this.navigation = navigation;
    this.$translate = $translate;
  }

  $onInit() {
    this.$routerParams = this.Exchange.getParams();
    this.account = this.navigation.currentActionData;

    this.$scope.delete = () => this.delete();
  }

  delete() {
    return this.exchangeAccountOutlook
      .delete(
        this.$routerParams.organization,
        this.$routerParams.productId,
        this.account.primaryEmailAddress,
      )
      .then(() => {
        this.messaging.writeSuccess(
          this.$translate.instant('exchange_accounts_outlook_delete_success'),
        );
      })
      .catch((error) => {
        this.messaging.writeError(
          this.$translate.instant('exchange_accounts_outlook_delete_error'),
          error,
        );
      })
      .finally(() => {
        this.navigation.resetAction();
      });
  }
}
