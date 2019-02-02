const express = require("express");
const router = express.Router();
const checkAuth = require('../check_auth')
const refresh = require('../updater/refresh');
const devicesData = require('../testMode/devices');

router.get('/ip', checkAuth, (req, res) => {
    let devices = refresh.getDevices();
    res.status(200).json({devices: devices});
    devicesData.setTimeN(new Date().getTime() + 5000);
    if(!refresh.isRunning()) 
    {
        refresh.getIps();
        refresh.intervalStart();
        console.log("start service");
    }
});

module.exports = router;