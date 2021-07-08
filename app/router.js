'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.post('/', controller.home.index);
  router.post('/2', controller.home.index2);
  router.get('/sendMail', controller.sendEmail.sendMail);
};
