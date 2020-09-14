import get from 'lodash/get';

export default class XdslMeetingCtrl {
  /* @ngInject */
  constructor($scope, $translate, OvhApiXdsl, TucToast) {
    this.$scope = $scope;
    this.$translate = $translate;
    this.OvhApiXdsl = OvhApiXdsl;
    this.TucToast = TucToast;
  }

  $onInit() {
    this.select = {
      meetingSlots: {
        fakeMeeting: false,
        slot: null,
      },
    };

    this.showMeetingSlots = false;
    this.meetingSlots = {};

    this.loading = true;
    this.meetings = [];

    this.errorMessage = '';
    this.successMessage = '';

    // Retrieve list of meetings available
    return this.OvhApiXdsl.v6()
      .searchOrderMeetings(this.$scope, {
        serviceName: this.serviceName,
      })
      .then((data) => {
        const { result } = data;
        if (result) {
          this.meetingSlots.canBookFakeMeeting = result.canBookFakeMeeting;
          this.meetingSlots.slots = result.meetingSlots;

          let slots = [];
          let prevTitle;
          data.result.meetingSlots.forEach((slot, index) => {
            const title = moment(slot.startDate).format('ddd DD MMM YYYY');
            if (!prevTitle) {
              prevTitle = title;
            } else if (prevTitle !== title) {
              this.meetings.push({
                title: prevTitle,
                slots,
              });
              slots = [];
              prevTitle = title;
            }
            slots.push({
              id: index,
              start: slot.startDate,
              end: slot.endDate,
              startTime: moment(slot.startDate).format('HH:mm'),
              endTime: moment(slot.endDate).format('HH:mm'),
              selected: false,
            });
          });
          this.showMeetingSlots = true;
        } else if (data.error) {
          // Display error
          this.errorMessage = this.$translate.instant('xdsl_meeting_error', {
            error: data.error,
          });
        }
      })
      .catch((error) => {
        this.errorMessage = this.$translate.instant('xdsl_meeting_error', {
          error: get(error, 'data.message'),
        });
      })
      .finally(() => {
        this.loading = false;
      });
  }

  checkConfirm() {
    return this.select.meetingSlots.slot !== null;
  }

  selectSlot(slotId) {
    this.select.meetingSlots.fakeMeeting = this.meetingSlots.canBookFakeMeeting;
    this.select.meetingSlots.slot = this.meetingSlots.slots[slotId];

    this.meetingSelectMessage = this.$translate.instant(
      'xdsl_meeting_programmed_meeting',
      { day: this.getDay(), start: this.getStart(), end: this.getEnd() },
    );
  }

  getDay() {
    const day = moment(this.select.meetingSlots.slot.startDate).format(
      'DD/MM/YYYY',
    );
    return day;
  }

  getStart() {
    const start = moment(this.select.meetingSlots.slot.startDate).format(
      'HH:mm',
    );
    return start;
  }

  getEnd() {
    const end = moment(this.select.meetingSlots.slot.endDate).format('HH:mm');
    return end;
  }

  orderMeeting() {
    return this.OvhApiXdsl.v6()
      .orderMeeting(
        {
          serviceName: this.serviceName,
        },
        {
          endDate: this.select.meetingSlots.slot.endDate,
          startDate: this.select.meetingSlots.slot.startDate,
          uiCode: this.select.meetingSlots.slot.uiCode,
        },
      )
      .$promise.then(() => {
        this.successMessage = this.$translate.instant(
          'xdsl_meeting_order_succeed',
          {
            day: this.getDay(),
            start: this.getStart(),
            end: this.getEnd(),
          },
        );
      })
      .catch((error) => {
        this.errorMessage = this.$translate.instant(
          'xdsl_meeting_order_error',
          {
            day: this.getDay(),
            start: this.getStart(),
            end: this.getEnd(),
            error: get(error, 'data.message'),
          },
        );
      });
  }
}
