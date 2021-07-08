'use strict';

const Service = require('egg').Service;
const moment = require('moment');

const token = '';
const url = '';
const organization_slug = 'sentry';
const project = 7;
const environment = 'production';
const errorType = [
  'AapiDuration',
  'AapiError',
];
const level = [
  'info',
  'error',
  'fatal',
  'debug',
];


class sentryService extends Service {

  async fetchRequestErrorCount() {
    const { start, end } = this._getYesterday();
    const type = errorType[1];
    const query = `errorType%3${type}`;
    const andiordCount = await this.fetchEventsMeta(`${query}+os.name%3AAndroid`, start, end);

    const iosCount = await this.fetchEventsMeta(`${query}+os.name%3AiOS`, start, end);
    return {
      iosCount,
      andiordCount,
    };
  }

  async fetchRequestOutTimeCount() {
    const { start, end } = this._getYesterday();
    const type = errorType[0];
    const query = `errorType%3${type}`;
    const andiordCount = await this.fetchEventsMeta(`${query}+os.name%3AAndroid`, start, end);
    const iosCount = await this.fetchEventsMeta(`${query}+os.name%3AiOS`, start, end);
    return {
      iosCount,
      andiordCount,
    };
  }

  async fetchCrashCount() {
    const { start, end } = this._getYesterday();
    const type = level[2];
    const query = `level%3A${type}`;
    const count = this.fetchEventsMeta(query, start, end);
    return count;
  }

  async fetchEventsMeta(query, start, end, options = {}) {
    const _setHeader = this._setHeader(options);
    const _q = this._setQuery(start, end);
    const ctx = this.ctx;
    const result = await ctx.curl(`${url}/api/0/organizations/${organization_slug}/events-meta/?${_q}&query=${query}`, _setHeader);

    const copy = Buffer.from(result.data);
    let r = copy.toString();
    r = JSON.parse(r);
    return r.count;
  }

  _setHeader(options) {
    return {
      headers: {
        Authorization: token,
      },
      ...options,
    };
  }

  _setQuery(start, end) {
    return `project=${project}&environment=${environment}&start=${start}&end=${end}`;
  }

  _getYesterday() {
    const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');
    const start = `${yesterday}T00%3A00%3A00.000`;
    const end = `${yesterday}T23%3A59%3A59.000`;
    return {
      yesterday,
      start,
      end,
    };
  }
}

module.exports = sentryService;
