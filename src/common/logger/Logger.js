import { jsonStringifyPretty } from '../../common/helpers/stringHelpers';

export class Logger {
  #currentLevel;

  constructor(level = 'info') {
    this.levels = ['debug', 'info', 'warn', 'error'];
    this.#currentLevel = level;
  }

  shouldLog(level) {
    return (
      this.levels.indexOf(level) >= this.levels.indexOf(this.#currentLevel)
    );
  }

  log(level, message) {
    if (this.shouldLog(level)) {
      const timestamp = new Date().toISOString();
      console.log(`[${timestamp}] [${level.toUpperCase()}]: ${message}`);
    }
  }

  debug(message) {
    this.log('debug', message);
  }

  info(message) {
    this.log('info', message);
  }

  warn(message) {
    this.log('warn', message);
  }

  error(message) {
    this.log('error', message);
  }

  static getInstance(level = 'error') {
    return `Logger ${level}`;
  }

  getCurrentLevel() {
    return this.#currentLevel;
  }

  requestLog(requestType, url, options = null) {
    const message = this.#sendingLogText(requestType, url, options);

    this.debug(message);
  }

  responseLog(requestType, url, body = null, status = null) {
    const message = this.#receivingLogText(requestType, url, body, status);

    this.debug(message);
  }

  #sendingLogText(requestType, url, body = null) {
    const text = this.#apiLogMessage(requestType, url, body);

    return `==> Sending ${text}`;
  }

  #receivingLogText(requestType, url, body = null, status = null) {
    const text = this.#apiLogMessage(requestType, url, body);

    return `<== Received response status=${status} ${text}`;
  }

  #apiLogMessage(requestType, url, body = null) {
    if (body) {
      const bodyStr = jsonStringifyPretty(body);

      return `${requestType} on ${url} with ${bodyStr}`;
    } else {
      return `${requestType} on ${url}`;
    }
  }
}
