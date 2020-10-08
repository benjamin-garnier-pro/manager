import controller from './logs-order.controller';
import template from './logs-order.html';

export default {
  bindings: {
    user: '<',
  },
  controller,
  controllerAs: 'ctrl',
  template,
};
