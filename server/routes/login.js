const cfg = require('../config_db')
const getDb = require('../controller').getDb
const checkAuth = require('../check_auth')
const jwt = require('jsonwebtoken');
const _db = getDb();
const express = require("express");
const router = express.Router();
const fs = require('fs');
const path = require('path');
const request = require("request");
const interval = require('../updater/refresh');

const privateKEY = fs.readFileSync(path.join(__dirname, 'private.key'), 'utf8');
console.log(fs.readFileSync(path.join(__dirname, 'private.key'), 'utf8'))

router.post('/', (req, res) => {

  let username = req.body.username;
  let password = req.body.password;

  const query = 'SELECT users_id, username, role, email FROM users WHERE username = ? AND password = ?';

  _db.query(query, [username, password], (error, results) => {
    if (error) {
      res.status(401).json({
        message: "Authentication error"
      });
    } else if (results.length < 1) {
      res.status(401).json({
        message: "Authentication error"
      });
    } else {
      // interval.getIps();
      // interval.interval();
        
      let userid = results[0].users_id;
      let username = results[0].username;
      let email = results[0].email;
      let role = results[0].role;
      let secretKey = privateKEY;

      let token = jwt.sign({
        user: username,
        userid: userid,
        email: email,
        role: role
      }, secretKey, {
        expiresIn: "1h",
        algorithm: "RS256"
      });

      res.status(200).json({
        token: token
      });
    }
  });

});

module.exports = router;
