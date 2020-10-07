export default class HostingCdnSharedService {

  /* @ngInject */
  constructor(OvhHttp) {
    this.OvhHttp = OvhHttp;
  }

  getAvailableHostings() {
    return this.OvhHttp.get(`/hosting/web`, {
      rootPath: 'apiv6',
      data: {},
    }).then((list) => {
        const lists = {no: [], v1: [], v2: []};
        list.forEach(hosting => {
          return this.getCDNProperties(hosting)
            .then((cdn) => {
              if (cdn.version === 'v2') {
                lists.v2.push(hosting);
              } else if (cdn.version === '2013v1') {
                lists.v1.push(hosting);
              } else {
                console.log('ZM:: Hosting.else', hosting);
              }
            })
            .catch((err) => {
              lists.no.push(hosting);
            });

        })

        console.log('ZM:: HostingList', lists);
      });
  }

  /**
   * Get this object properties
   * @param {string} serviceName: The internal name of your hosting
   * @returns {*}:
   */
  getCDNProperties(serviceName) {
    return this.OvhHttp.get(`/hosting/web/${serviceName}/cdn`, {
      rootPath: 'apiv6',
      data: {},
    });
  }

  /**
   * List available options for a Shared CDN service
   * @param {string} serviceName: The internal name of your hosting
   * @returns {*}:
   */
  getSharedCDNAvailableOptions(serviceName) {
    return this.OvhHttp.get(
      `/hosting/web/${serviceName}/cdn/availableOptions`,
      {
        rootPath: 'apiv6',
        data: {},
      },
    );
  }

  /**
   * List all domains for a Shared CDN service
   * @param {string} serviceName: The internal name of your hosting
   * @returns {*}:
   */
  getSharedCDNDomains(serviceName) {
    return this.OvhHttp.get(`/hosting/web/${serviceName}/cdn/domain`, {
      rootPath: 'apiv6',
      data: {},
    });
  }

  /**
   * Get details for a domain on a Shared CDN service
   * @param {string} serviceName: The internal name of your hosting
   * @param {string} domainName: Domain for which the details is required
   * @returns {*}
   */
  getSharedCDNDomainDetails(serviceName, domainName) {
    return this.OvhHttp.get(
      `/hosting/web/${serviceName}/cdn/domain/${domainName}`,
      {
        rootPath: 'apiv6',
        data: {},
      },
    );
  }

  /**
   * List all options for a domain
   * @param {string} serviceName: The internal name of your hosting
   * @param {string} domainName: Domain for which the details is required
   * @returns {*}
   */
  getCDNDomainsDetails(serviceName, domainName) {
    return this.OvhHttp.get(
      `/hosting/web/${serviceName}/cdn/domain/${domainName}/option`,
      {
        rootPath: 'apiv6',
        data: {},
      },
    );
  }

  /**
   * Reset an option to his default value
   * @param {string} serviceName: The internal name of your hosting
   * @param {string} domainName: Domain for which the details is required
   * @param {string} optionName: Option to reset to default
   * @returns {*}
   */
  resetCDNOptionToDefault(serviceName, domainName, optionName) {
    return this.OvhHttp.delete(
      `/hosting/web/${serviceName}/cdn/domain/${domainName}/option/${optionName}`,
      {
        rootPath: 'apiv6',
        data: {},
      },
    );
  }

  /**
   * Get details for an option on a domain
   * @param {string} serviceName: The internal name of your hosting
   * @param {string} domainName: Domain for which the details is required
   * @param {string} optionName: Option to reset to default
   * @returns {*}
   */
  getCDNDomainOptionDetails(serviceName, domainName, optionName) {
    return this.OvhHttp.get(
      `/hosting/web/${serviceName}/cdn/domain/${domainName}/option/${optionName}`,
      {
        rootPath: 'apiv6',
        data: {},
      },
    );
  }

  /**
   * Update an option on a domain
   * @param {string} serviceName: The internal name of your hosting
   * @param {string} domainName: Domain for which the details is required
   * @param {string} optionName: Option to reset to default
   * @returns {*}
   */
  updateCDNDomainOption(serviceName, domainName, optionName) {
    return this.OvhHttp.put(
      `/hosting/web/${serviceName}/cdn/domain/${domainName}/option/${optionName}`,
      {
        rootPath: 'apiv6',
        data: {},
      },
    );
  }

  /**
   * Flush cache content on CDN for a domain
   * @param {string} serviceName: The internal name of your hosting
   * @param {string} domainName: Domain for which the details is required
   * @returns {*}
   */
  flushCDNDomainCache(serviceName, domainName) {
    return this.OvhHttp.post(
      `/hosting/web/${serviceName}/cdn/domain/${domainName}/purge`,
      {
        rootPath: 'apiv6',
        data: {},
      },
    );
  }

  /**
   * Trigger a refresh for a domain
   * @param {string} serviceName: The internal name of your hosting
   * @param {string} domainName: Domain for which the details is required
   * @returns {*}
   */
  refreshCDNDomain(serviceName, domainName) {
    return this.OvhHttp.post(
      `/hosting/web/${serviceName}/cdn/domain/${domainName}/refresh`,
      {
        rootPath: 'apiv6',
        data: {},
      },
    );
  }

  /**
   * List all operations for a Shared CDN service
   * @param {string} serviceName: The internal name of your hosting
   * @returns {*}
   */
  getCDNServiceOperations(serviceName) {
    return this.OvhHttp.get(`/hosting/web/${serviceName}/cdn/operation`, {
      rootPath: 'apiv6',
      data: {},
    });
  }

  /**
   * Get details for a Shared CDN operation
   * @param {string} serviceName: The internal name of your hosting
   * @param {string} id: Id of the operation
   * @returns {*}
   */
  getSharedCDNServiceOperationDetails(serviceName, id) {
    return this.OvhHttp.get(`/hosting/web/${serviceName}/cdn/operation/${id}`, {
      rootPath: 'apiv6',
      data: {},
    });
  }
}
