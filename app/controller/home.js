'use strict';

const Controller = require('egg').Controller;
const os = require('os');

class HomeController extends Controller {
  async index() {
    console.log(this.ctx.request.body);
    const txt = JSON.stringify(this.ctx.request.body || '{}');
    const fs = require('fs');

    fs.appendFile('./1.txt', txt + os.EOL, error => {
      if (error) return console.log('写入文件失败,原因是' + error.message);
      console.log('写入成功');
    });
  }


  async index2() {
    console.log(this.ctx.request.body);
    const txt = JSON.stringify(this.ctx.request.body || '{}');
    const fs = require('fs');

    fs.appendFile('./2.txt', txt + os.EOL, error => {
      if (error) return console.log('写入文件失败,原因是' + error.message);
      console.log('写入成功');
    });
  }
}

module.exports = HomeController;
