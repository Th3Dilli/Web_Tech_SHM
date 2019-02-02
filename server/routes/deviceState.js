const express = require("express");
const router = express.Router();
const checkAuth = require('../check_auth')
const refresh = require('../updater/refresh');

router.get('/ip', checkAuth, (req, res) => {
    let devices = refresh.getDevices();
    res.status(200).json({devices: devices});

});

module.exports = router;