const cfg = require('../config_db')
const getDb = require('../controller').getDb
const jwt = require('jsonwebtoken');
const _db = getDb();
const express = require("express");
const router = express.Router();

router.post('/', (req, res) => {   
    let username = req.body.username;
    let password = req.body.password;

    const query = 'SELECT id, username, role FROM users WHERE username = ? AND password = ?';

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
            let userid = results[0].id;
            let username = results[0].username;
            let role = results[0].role;
            let secretKey = cfg.jwtkey.JWT_KEY

            let token = jwt.sign({user: username, userid: userid, role: role} , secretKey, 
                { 
                    expiresIn: "1h",
                    algorithm: "HS256"
                });

            res.status(200).json({
                token: token
            }); 
        }
    });

});

module.exports = router;

