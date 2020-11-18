export default class NetappService {
  /* @ngInject */
  constructor($q, OvhHttp) {
    this.$q = $q;
    this.OvhHttp = OvhHttp;
  }

  getService(netappId) {
    return this.OvhHttp.get(`/storage/netapp/${netappId}`, {
      rootPath: 'apiv6',
    });
  }

  getShares(netappId) {
    return this.OvhHttp.get(`/storage/netapp/${netappId}/share`, {
      rootPath: 'apiv6',
    }).then((share) => {
      return this.$q.all(
        share.map((item) =>
          this.OvhHttp.get(`/dedicated/netapp/${netappId}/share/${item.id}`, {
            rootPath: 'apiv6',
          }),
        ),
      );
    });
  }
}
