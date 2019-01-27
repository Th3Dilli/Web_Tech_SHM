const express = require("express");
const router = express.Router();
const checkAuth = require('../check_auth')
const getDb = require('../controller').getDb
const _db = getDb();
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const request = require('request');

const privateKEY = fs.readFileSync(path.join(__dirname, 'private.key'), 'utf8');

router.patch('/toggle', checkAuth, (req, res) => {

    const powerState = req.body.powerState;
    const ip = req.body.ip;
    const ch = req.body.channel;

    const url = 'http://' + ip + '/cm?cmnd=Power' + ch + ' ' + powerState;
    console.log(url);
    request.get(url, (error, response, body) => {
        if(error)
        {
            res.status(404).json({
                message: "Device Not Found",
                error: error
            });
        } else if (response.statusCode != 200) {
            console.log('error: ' + response.statusCode);
            console.log(error);
            console.log(body);
            res.status(500).json({
                message: "Failed to toggle",
                error: error
            });
        } else if (response.statusCode == 200) {
            console.log('ok: ' + response);
            res.status(200).json({
                message: "Success toggeling",
                params: req.body
            })
        }
    
    });

});

module.exports = router;