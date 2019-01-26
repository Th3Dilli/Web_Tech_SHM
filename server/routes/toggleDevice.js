const express = require("express");
const router = express.Router();
const checkAuth = require('../check_auth')
const getDb = require('../controller').getDb
const _db = getDb();
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const privateKEY = fs.readFileSync(path.join(__dirname, 'private.key'), 'utf8');

router.get('/toggleDevice', checkAuth, (req, res) => {

    res.status(200).json({
        message: "got em"
      });
      console.log("got em");

});

module.exports = router;