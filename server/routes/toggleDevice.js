const express = require('express');
const router = express.Router();
const checkAuth = require('../modules/check_auth');
const request = require('request');
const testMode = require('../config/config').testMode;
const devicesData = require('../modules/testMode/devices');

router.patch('/toggle', checkAuth, (req, res) => {

    const powerState = req.body.powerState;
    const ip = req.body.ip;
    const ch = req.body.channel;

    if (testMode) {
        devicesData.setDevicesData(ip, 'POWER' + ch, powerState);
        res.status(200).json({
            message: 'Success toggeling device testMode'
        })
    } else {
        const url = 'http://' + ip + '/cm?cmnd=Power' + ch + ' ' + powerState;
        request.get(url, (error, response, body) => {
            if (error) {
                res.status(404).json({
                    message: 'Device Not Found'
                });
            } else if (response.statusCode != 200) {
                console.log('toggleDevice failed to toggle device: ' + response.statusCode);
                res.status(500).json({
                    message: 'Failed to toggle device'
                });
            } else if (response.statusCode == 200) {
                res.status(200).json({
                    message: 'Success toggeling device'
                });
            }
        });
    }
});

module.exports = router;