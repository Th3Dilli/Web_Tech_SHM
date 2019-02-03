const express = require('express');
const router = express.Router();
const checkAuth = require('../modules/check_auth');
const deviceState_service = require('../modules/deviceState.service');
const devicesData = require('../modules/testMode/devices');

router.get('/ip', checkAuth, (req, res) => {
    const devices = deviceState_service.getDevices();
    res.status(200).json({ devices: devices });
    devicesData.setTimeN(new Date().getTime() + 5000);
    if (!deviceState_service.isRunning()) {
        deviceState_service.getIps();
        deviceState_service.intervalStart();
        console.log('Get device status service started');
    }
});

module.exports = router;