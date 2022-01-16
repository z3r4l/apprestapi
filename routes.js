'use strict';

module.exports = function (app) {
  let myjson = require('./contoller');

  app.route('/').get(myjson.index);

  app.route('/tampil').get(myjson.tampilMahasiswa);

  app.route('/tampil/:id').get(myjson.tampilMahasiswaId);
};
