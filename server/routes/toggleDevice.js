const express = require('express');
const router = express.Router();
const checkAuth = require('../modules/check_auth')
const fs = require('fs');
const path = require('path');
const request = require('request');
const testMode = require('../config/config').testMode;
const devicesData = require('../modules/testMode/devices');

const privateKEY = fs.readFileSync(path.join(__dirname, 'private.key'), 'utf8');

router.patch('/toggle', checkAuth, (req, res) => {

    const powerState = req.body.powerState;
    const ip = req.body.ip;
    const ch = req.body.channel;

    if (testMode) {
        devicesData.setDevicesData(ip, 'POWER' + ch, powerState);
        res.status(200).json({
            message: 'Success toggeling',
            params: req.body
        })
    } else {
        const url = 'http://' + ip + '/cm?cmnd=Power' + ch + ' ' + powerState;
        console.log(url);
        request.get(url, (error, response, body) => {
            if (error) {
                res.status(404).json({
                    message: 'Device Not Found',
                    error: error
                });
            } else if (response.statusCode != 200) {
                console.log('error: ' + response.statusCode);
                console.log(error);
                res.status(500).json({
                    message: 'Failed to toggle',
                    error: error
                });
            } else if (response.statusCode == 200) {
                res.status(200).json({
                    message: 'Success toggeling'
                });
            }

        });
    }


});

module.exports = router;