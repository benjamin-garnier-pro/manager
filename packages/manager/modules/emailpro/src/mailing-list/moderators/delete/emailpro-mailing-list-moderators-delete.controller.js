import angular from 'angular';
import get from 'lodash/get';
import uniq from 'lodash/uniq';
import validator from 'validator';

export default class EmailProMXPlanMailingListsCreateModeratorsCtrl {
  /* @ngInject */
  constructor($scope, $translate, Alerter, EmailProMXPlanMailingLists) {
    this.$scope = $scope;
    this.$translate = $translate;
    this.Alerter = Alerter;
    this.EmailProMXPlanMailingLists = EmailProMXPlanMailingLists;
  }

  $onInit() {
    this.errors = [];
    this.mailingList = angular.copy(this.$scope.currentActionData.mailingList);
    this.moderators = angular.copy(this.$scope.currentActionData.moderators);
    this.loading = false;
    this.selection = [];

    this.$scope.deleteModerators = () => this.deleteModerators();
  }

  static addressValidator(addr) {
    return validator.isEmail(addr) && /^[\w@.-]+$/.test(addr);
  }

  deleteModerators() {
    this.loading = true;
    const moderatorsToDelete = uniq(this.selection);

    return this.EmailProMXPlanMailingLists.deleteModerators(
      get(this.$scope, 'exchange.associatedDomainName'),
      {
        mailingList: this.mailingList.name,
        users: moderatorsToDelete,
        type: 'moderator',
      },
    )
      .then((tasks) => {
        this.Alerter.alertFromSWSBatchResult(
          {
            OK: this.$translate.instant(
              moderatorsToDelete.length === 1
                ? 'mailing_list_tab_modal_moderator_delete_success'
                : 'mailing_list_tab_modal_moderators_delete_success',
            ),
            PARTIAL: this.$translate.instant(
              'mailing_list_tab_modal_moderators_delete_error',
            ),
            ERROR: this.$translate.instant(
              'mailing_list_tab_modal_moderators_delete_error',
            ),
          },
          tasks,
          this.$scope.alerts.main,
        );

        this.EmailProMXPlanMailingLists.pollState(
          this.$scope.exchange.associatedDomainName,
          {
            id: tasks.task,
            mailingList: this.mailingList,
            successStates: ['noState'],
            namespace: 'EmailProMXPlanMailingLists.moderators.poll',
          },
        );
      })
      .catch((err) => {
        this.Alerter.alertFromSWS(
          this.$translate.instant(
            moderatorsToDelete.length === 1
              ? 'mailing_list_tab_modal_moderator_delete_error'
              : 'mailing_list_tab_modal_moderators_delete_error',
          ),
          err,
          this.$scope.alerts.main,
        );
      })
      .finally(() => {
        this.loading = false;
        this.$scope.resetAction();
      });
  }
}
