import { SUCCESS_CODE } from '../constants/responceCodes';

export class ApiClientFacade {
  constructor(options) {
    this.request = options.request;
    this.baseUrl = options.baseUrl || '';
    this.logger = options.logger;
  }

  async post(url, options) {
    const fullUrl = this.fullUrl(url);
    const request = this.request.post(fullUrl, options);

    return await this.sendRequestWithLogs(request, 'POST', fullUrl, options);
  }

  async get(url, options) {
    const fullUrl = this.fullUrl(url);
    const request = this.request.get(fullUrl, options);

    return await this.sendRequestWithLogs(request, 'GET', fullUrl, options);
  }

  async put(url, options) {
    const fullUrl = this.fullUrl(url);
    const request = this.request.put(fullUrl, options);

    return await this.sendRequestWithLogs(request, 'PUT', fullUrl, options);
  }

  async delete(url, options) {
    const fullUrl = this.fullUrl(url);
    const request = this.request.delete(fullUrl, options);

    return await this.sendRequestWithLogs(request, 'DELETE', fullUrl, options);
  }

  async sendRequestWithLogs(requestFunc, requestType, url, options) {
    this.logger.requestLog(requestType, url, options);

    const response = await requestFunc;
    const body = await this.parseBodyOrStatusText(response);

    this.logger.responseLog(requestType, url, body, response.status());

    return response;
  }

  fullUrl(url) {
    return this.baseUrl ? `${this.baseUrl}${url}` : url;
  }

  async parseBodyOrStatusText(response) {
    return response.status() === SUCCESS_CODE
      ? await response.json()
      : response.statusText();
  }
}
