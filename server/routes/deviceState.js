const express = require("express");
const router = express.Router();
const checkAuth = require('../check_auth')
const refresh = require('../updater/refresh');

router.get('/ip', checkAuth, (req, res) => {
    let devices=refresh.getDevices();
    console.log(devices);
    res.status(200).json({
    message: devices,
    //params: req.body
    });

});

module.exports = router;