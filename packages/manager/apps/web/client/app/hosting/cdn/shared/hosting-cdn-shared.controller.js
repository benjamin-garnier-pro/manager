import filter from 'lodash/filter';
import includes from 'lodash/includes';
import get from "lodash/get";

export default class {
  /* @ngInject */
  constructor($scope, $filter, $timeout, $translate) {
    this.$scope = $scope;
    this.$filter = $filter;
    this.$timeout = $timeout;
    this.$translate = $translate;
  }

  $onInit() {

  }

}
