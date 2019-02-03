/**
 *  The username and the password is checked against the database
 *  if they are valid the user will be logged in and get a uniqe token that is created using JWT module
 *  
 * the token is generted using a private and will be encrypted using the public key when the user request secure routes on the server
 * 
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
