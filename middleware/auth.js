const connection = require('../koneksi');
const mysql = require('mysql');
const md5 = require('MD5');
const response = require('../res');
const jwt = require('jsonwebtoken');
const config = require('../config/secret');
const ip = require('ip');
//controller untuk register
exports.registrasi = (req, res) => {
  let post = {
    username: req.body.username,
    email: req.body.email,
    password: md5(req.body.password),
    role: req.body.role,
    tgl_daftar: new Date(),
  };
  let query = 'SELECT email FROM ?? WHERE ??=?';
  let table = ['user', 'email', post.email];

  query = mysql.format(query, table);
  connection.query(query, (error, rows) => {
    if (error) {
      console.log(error);
    } else {
      if (rows.length == 0) {
        let query = 'INSERT INTO ?? SET ?';
        let table = ['user'];
        query = mysql.format(query, table);
        connection.query(query, post, (error, rows) => {
          if (error) {
            console.log(error);
          } else {
            response.ok('berhasil menambahkan data user baru', res);
          }
        });
      } else {
        response.ok('Email sudah terdaftar !', res);
      }
    }
  });
};
