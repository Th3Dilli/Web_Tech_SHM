const express = require('express');
const router = express.Router();
const checkAuth = require('../modules/check_auth')
const getDb = require('../modules/database').getDb
const _db = getDb();
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const privateKEY = fs.readFileSync(path.join(__dirname, 'private.key'), 'utf8');

router.patch('/userEdit', checkAuth, (req, res) => {
  let usernameN = req.body.username;
  let emailN = req.body.email;

  let token = jwt.decode(req.headers.authorization.split(' ')[1]);

  const sql = 'UPDATE `users` SET email=?, username=? WHERE users_id = ?';
  console.log(token);
  _db.query(sql, [emailN, usernameN, token.userid], (error, results) => {
    if (error) {
      if (error.sqlMessage.includes('Duplicate entry')) {
        console.log('Duplicate entry');
        res.status(400).json({
          message: 'Duplicate entry'
        });
      } else {
        res.status(400).json({
          message: 'Error'
        });
      }
    } else if (results.length < 1) {
      res.status(404).json({
        message: 'User not found'
      });
    } else {
      let newToken = jwt.sign({
        user: usernameN,
        userid: token.userid,
        email: emailN,
        role: token.role
      }, privateKEY, {
          expiresIn: '1h',
          algorithm: 'RS256'
        });
      res.status(200).json({
        token: newToken
      });
    }
  })
  res.status(200);
});

module.exports = router;