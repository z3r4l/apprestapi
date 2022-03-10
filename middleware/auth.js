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

//controller untuk login

exports.login = (req, res) => {
  let post = {
    email: req.body.email,
    password: md5(req.body.password),
  };

  let query = 'SELECT * FROM ?? WHERE ??=? AND ??=?';
  let table = ['user', 'email', post.email, 'password', post.password];

  query = mysql.format(query, table);
  connection.query(query, (error, rows) => {
    if (error) {
      console.log(error);
    } else {
      if (rows.length == 1) {
        let token = jwt.sign({ rows }, config.secret, {
          expiresIn: 1440,
        });

        id_user = rows[0].id;
        let data = {
          id_user: id_user,
          access_token: token,
          ip_address: ip.address(),
        };
        let query = 'INSERT INTO ?? SET ?';
        let table = ['akses_token'];

        query = mysql.format(query, table);
        connection.query(query, data, (error, rows) => {
          if (error) {
            console.log(error);
          } else {
            res.json({
              success: true,
              message: 'Token JWT Tergenerate',
              token: token,
              currUser: data.id_user,
            });
          }
        });
      } else {
        res.json({
          Error: true,
          message: 'Email atau Password salah',
        });
      }
    }
  });
};
