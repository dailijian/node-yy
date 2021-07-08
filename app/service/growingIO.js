'use strict';

const Service = require('egg').Service;
const moment = require('moment');

const project_uid = 'EoZ3dW9k';
const token = '';
const url = 'https://www.growingio.com';

class GrowingIOService extends Service {

  async shijiAppDAU() {
    const chartIdAndroid = '1P6QagzR';
    const chartIdIos = 'noqQwBwo';

    const android = await this.fetchGrowingDAU(chartIdAndroid);
    const ios = await this.fetchGrowingDAU(chartIdIos);
    return {
      android,
      ios,
    };
  }

  async youhuoDAU() {
    const chartId = 'noqQw2do';
    let few = 1;
    // 本周：当日为周一时则取，上一周时间
    if (moment().format('E') === 1) {
      few = 2;
    }
    const thisWeekTime = this._getFewWeekDayStartAndEnd(few === 2 ? 1 : 0);
    const thisWeek = await this.fetchGrowingDAU(chartId, thisWeekTime);

    const lastWeekTime = this._getFewWeekDayStartAndEnd(few);
    const lastWeek = await this.fetchGrowingDAU(chartId, lastWeekTime);

    const day = moment().format('DD');
    // 本月：当日为 1 号时则取上个月时间
    const monthTime = this._getFewMonthDayStartAndEnd(few === 2 ? 1 : 0);
    const month = await this.fetchGrowingDAU(chartId, monthTime);

    return {
      thisWeek,
      lastWeek,
      month,
    };
  }


  async shijiLiuchun() {
    const retention_id = 'xRx5adbP';

    const ctx = this.ctx;
    const result = await ctx.curl(`${url}/v2/projects/${project_uid}/retentions/${retention_id}.json`, {
      headers: {
        Authorization: token,
      },
    });

    const copy = Buffer.from(result.data);
    let r = copy.toString();
    r = JSON.parse(r);

    return r;
  }

  async fetchGrowingDAU(chartId, options = {}) {
    const ctx = this.ctx;
    const result = await ctx.curl(`${url}/v2/projects/${project_uid}/charts/${chartId}.json`, {
      headers: {
        Authorization: token,
      },
      data: {
        ...options,
      },
    });

    const copy = Buffer.from(result.data);
    let r = copy.toString();
    r = JSON.parse(r);
    const pv = r.data.reduce((total, b) => {
      total = Array.isArray(total) ? total[2] : total;
      b = Array.isArray(b) ? b[2] : 0;
      return total + b;
    }, 0);
    const uv = r.aggregator.values[0];
    return {
      uv,
      pv,
    };
  }

  _getFewWeekDayStartAndEnd(few) {
    // 上周: 当日为周一时则取，上上一周时间
    let weekTime = {};
    if (!few) {
      weekTime = {
        startTime: moment().startOf('week').add(1, 'day')
          .valueOf(),
        endTime: moment().day(moment().day() - 1).endOf('day')
          .valueOf(),
      };
    } else {
      const lastWeekDay = moment().subtract(few, 'week').format('YYYY-MM-DD');
      weekTime = {
        startTime: moment(lastWeekDay).startOf('isoWeek')
          .valueOf(),
        endTime: moment(lastWeekDay).endOf('isoWeek').valueOf(),
      };
    }

    return {
      ...weekTime,
    };
  }

  _getFewMonthDayStartAndEnd(few) {
    let monthTime = {};
    if (!few) {
      monthTime = {
        startTime: moment().startOf('month').valueOf(),
        endTime: moment().day(moment().day() - 1).endOf('day')
          .valueOf(),
      };
    } else {
      const lastMonthDay = moment().subtract(few, 'month').format('YYYY-MM-DD');
      monthTime = {
        startTime: moment(lastMonthDay).startOf('month')
          .valueOf(),
        endTime: moment(lastMonthDay).endOf('month')
          .valueOf(),
      };
    }
    return {
      ...monthTime,
    };
  }
}

module.exports = GrowingIOService;
