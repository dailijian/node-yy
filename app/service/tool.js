'use strict';

const Service = require('egg').Service;

const nodemailer = require('nodemailer');
const user_email = '985951868@qq.com';
const auth_code = 'ojutpsxyqcambfca';

const transporter = nodemailer.createTransport({
  service: 'qq',
  secureConnection: true,
  port: 465,
  auth: {
    user: user_email, // 账号
    pass: auth_code, // 授权码
  },
});

class ToolService extends Service {

  async sendMail(email, subject, html) {

    const mailOptions = {
      from: user_email, // 发送者,与上面的user一致
      to: email, // 接收者,可以同时发送多个,以逗号隔开
      subject, // 标题
      html,
    };

    try {
      await transporter.sendMail(mailOptions);
      return true;
    } catch (err) {
      return false;
    }
  }

}

module.exports = ToolService;
