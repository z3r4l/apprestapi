'use strict';

module.exports = function (app) {
  let myjson = require('./contoller');

  app.route('/').get(myjson.index);
};
