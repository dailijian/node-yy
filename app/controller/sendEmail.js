'use strict';

const Controller = require('egg').Controller;
const moment = require('moment');

class sendEmailController extends Controller {
  async sendMail() {

    console.log(moment().format('DD'), '-as-fas-fa-sf-');
    const ctx = this.ctx;
    const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');
    const email = 'dljlyy@126.com'; // 接收者的邮箱
    const subject = `[${yesterday}][前端监控数据]`;

    // sentry 请求错误数和超时数
    const requestErrorCount = await this.service.sentry.fetchRequestErrorCount();
    const requestOutTimeCount = await this.service.sentry.fetchRequestOutTimeCount();

    // bugly 拉去崩溃数量
    const crashCount = await this.service.sentry.fetchCrashCount();

    // 拉去司机APP日活数据
    const shijiDua = await this.service.growingIO.shijiAppDAU();

    // 司机端物流业务指标 有货
    const youhuoDAU = await this.service.growingIO.youhuoDAU();


    const reportData = {
      title: subject,
      requestErrorCount,
      requestOutTimeCount,
      crashCount,
      shijiDua,
      youhuoDAU,
    };
    const html = await this.ctx.renderView('email/daily.tpl', reportData);

    ctx.body = html;

    // const has_send = await this.service.tool.sendMail(email, subject, html);

    // if (has_send) {
    //   ctx.body = {
    //     message: '发送成功',
    //   };
    //   return;
    // }
    // ctx.body = {
    //   message: '发送失败',
    // };

  }

  async setSentryApiErrorTotal() {
    const environment = 'production';
    const project = 7;
    const organization_slug = 'sentry';
    const statsPeriod = '24h';
    const token = 'Bearer d2910f2cb4ff488ea041d8f1cf6048977dbe62a7993a496892d4e99b5598fe05';
    const url = 'http://10.20.9.108:9000';

    // /api/0/organizations/sentry/issues/?limit=5&project=7&query=&&statsPeriod=24h
    const ctx = this.ctx;
    const result = await ctx.curl(`${url}/api/0/organizations/${organization_slug}/events-stats/?interval=5m&environment=${environment}&query=errorType%3AapiError&yAxis=count()&orderby=&partial=1&statsPeriod=${statsPeriod}&project=${project}`, {
      headers: {
        Authorization: token,
      },
    });

    const copy = Buffer.from(result.data);
    let r = copy.toString();
    r = JSON.parse(r);

    let count = 0;
    r.data.forEach(req => {
      req.forEach(item => {
        if (!Array.isArray(item)) return;
        item.forEach(i => {
          if (!i.count) return;
          count = +i.count + count;
        });
      });
    });
    return count;
  }

  async setGrowingio() {
    const project_uid = 'EoZ3dW9k';
    const dashboard_id = 'korr05xo';
    const charts_id = 'QReq7q1R';
    const retention_id = 'xRx5adbP';
    const token = 'eMiQxJ8C1T9L0SfhsTtK4T8u4dNXL9zxXBi4Yz5ozwYrSiFQFjVLwiUVZ0O94gIX';
    const url = 'https://www.growingio.com';
    const ctx = this.ctx;
    const result = await ctx.curl(`${url}/v2/projects/${project_uid}/retentions/${retention_id}.json`, {
      headers: {
        Authorization: token,
      },
      data: {
        range: 'day',
        startTime: '',
      },
    });

    const copy = Buffer.from(result.data);
    let r = copy.toString();
    r = JSON.parse(r);

    ctx.body = r;

    // let count = 0;
    // r.data.forEach(req => {
    //   req.forEach(item => {
    //     if (!Array.isArray(item)) return;
    //     item.forEach(i => {
    //       if (!i.count) return;
    //       count = +i.count + count;
    //     });
    //   });
    // });
    // return count;
  }


}

module.exports = sendEmailController;
