const cfg = require('../config_db')
const getDb = require('../controller').getDb
const checkAuth = require('../check_auth')
const jwt = require('jsonwebtoken');
const _db = getDb();
const express = require("express");
const router = express.Router();
const fs = require('fs');
const path = require('path');

const privateKEY = fs.readFileSync(path.join(__dirname, 'private.key'), 'utf8');
console.log(fs.readFileSync(path.join(__dirname, './private.key'), 'utf8'))


router.post('/', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;

  const query = 'SELECT users_id, username, role FROM users WHERE username = ? AND password = ?';

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
      let userid = results[0].users_id;
      let username = results[0].username;
      let role = results[0].role;
      let secretKey = privateKEY;

      let token = jwt.sign({
        user: username,
        userid: userid,
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

router.get('/refresh', checkAuth, (req, res) => {
  let secretKey = privateKEY;
  let header = jwt.decode(req.headers.authorization.split(" ")[1]); 
        let userid = header.userid
        let user = header.user
        let role = header.role

  const token = jwt.sign({userid, user, role}, secretKey, {
    expiresIn: "1h",
    algorithm: "RS256"
  });
  res.status(200).json({
    token: token
  });

});

module.exports = router;
