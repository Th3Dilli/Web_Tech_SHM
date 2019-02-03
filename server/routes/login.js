/**
 *  The username and the password is checked against the database.
 *  If they are valid the user will be logged in and gets an unique JWT token as response.
 *  This unique token is stored for a limited time on the client side and identifies the user on every request. 
 *  The token is send as an authorization header to the backend on each request and gets verified with the checkAuth.js module
 *  The token is generated with JWT.Sign(), using a private RSA key and RS256 algorithm. 
 *  Only the backend knows the secret RSA keys. Every JWT Token and User Session expires in 1h.
 *  
 * @author Markus Macher 
 */

const getDb = require('../modules/database').getDb;
const jwt = require('jsonwebtoken');
const _db = getDb();
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const privateKEY = fs.readFileSync(path.join(__dirname, 'private.key'), 'utf8');

router.post('/', (req, res) => {

  const username = req.body.username;
  const password = req.body.password;

  const query = 'SELECT users_id, username, role, email FROM users WHERE username = ? AND password = ?';

  _db.query(query, [username, password], (error, results) => {
    if (error) {
      res.status(401).json({
        message: 'Authentication error'
      });
    } else if (results.length < 1) {
      res.status(401).json({
        message: 'Authentication error'
      });
    } else {
      const userid = results[0].users_id;
      const username = results[0].username;
      const email = results[0].email;
      const role = results[0].role;

      const token = jwt.sign({
        user: username,
        userid: userid,
        email: email,
        role: role
      }, privateKEY, {
        expiresIn: '1h',
        algorithm: 'RS256'
      });

      res.status(200).json({
        token: token
      });
    }
  });
});

module.exports = router;
