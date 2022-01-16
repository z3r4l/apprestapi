'use strict';

let response = require('./res');
let connection = require('./koneksi');

exports.index = (res) => {
  response.ok('Aplikasi REST API Terhubung', res);
};

// menampilkan data mahasiswa
exports.tampilMahasiswa = (req, res) => {
  connection.query('SELECT * FROM mahasiswa', (error, rows) => {
    if (error) {
      console.log(error);
    } else {
      response.ok(rows, res);
    }
  });
};

//menampilkan data mahasiswa berdasarkan id

exports.tampilMahasiswaId = (req, res) => {
  let id = req.params.id;
  connection.query('SELECT * FROM mahasiswa WHERE id_mahasiswa = ?', [id], function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      response.ok(rows, res);
    }
  });
};
