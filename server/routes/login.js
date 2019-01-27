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

const privateKEY = fs.readFileSync(path.join(__dirname, 'private.key'), 'utf8');
console.log(fs.readFileSync(path.join(__dirname, 'private.key'), 'utf8'))
let countUsersLoggedIn=0;
let usersLoggedIn=false;


let startSHDeviceStatusInterval= function(){
    countUsersLoggedIn++;
    const query = 'SELECT ip FROM device';
    
    var ips = [];
    
    _db.query(query, (error, results) => {
        if (error) {
          Console.log("fail");
        } else if (results.length < 1) {
          console.log("no dev found");
        } else {
            for(let i in results){
                ips.push(results[i].ip);
            }
            console.log(ips);
        }
    });

    if(countUsersLoggedIn>0&&!usersLoggedIn){
        usersLoggedIn=true;
        var statChanged = setInterval(refreshStat, 1000);
        function refreshStat() {
            
            for(let ip in ips){
                const url = 'http://' + ips[ip] + '/cm?cmnd=Status' + "11";
                //(async () => {
                    request.get(url, (error, response, body) => {

                        if(error){
                            console.log(ips[ip]+" Failed" );
                        }
                        else if(bdy[ip]!=response.body){
                            console.log(ips[ip]+" status changed");
                            bdy[ip]=response.body;
                        }
                    });
                //})();
            }
        }
    }
};
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
      startSHDeviceStatusInterval();
        
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
