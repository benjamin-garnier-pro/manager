import get from 'lodash/get';

export default class HostingFlushCdnCtrl {
  /* @ngInject */
  constructor($scope, $rootScope, $stateParams, $translate, Hosting, HostingCDN, Alerter) {
    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.$stateParams = $stateParams;
    this.$translate = $translate;
    this.Hosting = Hosting;
    this.HostingCDN = HostingCDN;
    this.Alerter = Alerter;
  }

  $onInit() {
    this.loading = false;
    this.$scope.flushCdn = () => this.flushCdn();
  }

  flushCdn() {
    const isV1CDN = get(this.$scope.cdnProperties, 'version', '') === '2013v1';
    const flushPromise = isV1CDN ? this.flushV1CDN() : this.flushSharedCDN();
    flushPromise.then(() => {
        this.Alerter.success(
          this.$translate.instant('hosting_dashboard_cdn_flush_success'),
          this.$scope.alerts.main,
        );
        this.$rootScope.$broadcast('hosting.cdn.flush.refresh');
      })
      .catch((err) => {
        this.Alerter.alertFromSWS(
          this.$translate.instant('hosting_dashboard_cdn_flush_error'),
          get(err, 'data', err),
          this.$scope.alerts.main,
        );
      })
      .finally(() => {
        this.$scope.resetAction();
      });
  }

  /**
   * Flushed all domains, stay to cover V1 CDN Client
   */
  flushV1CDN() {
    return this.Hosting.flushCdn(this.$stateParams.productId);
  }

  /**
   * Flushed by domain, implemented for CDN V2
   */
  flushSharedCDN() {
    const {serviceName} = this.$scope.cdnProperties;
    const {domain} = this.$scope.currentActionData;
    return this.HostingCDN.flushCDNDomainCache(serviceName, domain.domain);
  }
}
