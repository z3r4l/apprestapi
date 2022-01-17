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

// menambahkan data mahasiswa
exports.tambahData = (req, res) => {
  let nim = req.body.nim;
  let nama = req.body.nama;
  let jurusan = req.body.jurusan;

  connection.query('INSERT INTO mahasiswa (nim,nama,jurusan) VALUES (?,?,?)', [nim, nama, jurusan], (error, rows, fields) => {
    if (error) {
      console.log(error);
    } else {
      response.ok('Data Berhasil Di Tambahkan', res);
    }
  });
};

// mengubah data mahasiswa
exports.ubahData = (req, res) => {
  let id = req.body.id_mahasiswa;
  let nim = req.body.nim;
  let nama = req.body.nama;
  let jurusan = req.body.jurusan;

  connection.query('UPDATE mahasiswa SET nim=?, nama=?, jurusan=? WHERE id_mahasiswa=?', [nim, nama, jurusan, id], (error, rows, field) => {
    if (error) {
      console.log(error);
    } else {
      response.ok('Berhasil Mengubah Data', res);
    }
  });
};
