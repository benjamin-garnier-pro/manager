export default /* @ngInject */ ($stateProvider) => {
  $stateProvider.state('dbaas-logs.order', {
    url: '/order',
    views: {
      logsHeader: 'dbaasLogsListHeader',
      logsContainer: 'dbaasLogsOrder',
    },
    resolve: {
      user: ($http) => {
        return $http.get('/me').then(({ data }) => data);
      },
    },
  });
};
