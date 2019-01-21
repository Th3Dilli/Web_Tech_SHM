const express = require("express");
const router = express.Router();
const checkAuth = require('../check_auth')
const getDb = require('../controller').getDb
const _db = getDb();
const modulesArray = require("../config_modules").modules;
const jwt = require('jsonwebtoken');

router.get('/all', checkAuth, (req, res) => {

  let query = `SELECT d.id, d.module_type, d.device_name, d.ip, d.mac, r.room_name
	FROM users u, device d, rooms r, room_devices rd 
	WHERE u.id = ? and r.id = u.room_id and rd.room_id = r.id and rd.device_id = d.id;
	`;
  let queryAll = `SELECT d.id, d.module_type, d.device_name, d.ip, d.mac, r.room_name, u.username 
	FROM users u, device d, rooms r, room_devices rd 
	WHERE d.id = rd.device_id and rd.room_id = r.id and u.room_id = r.id;
	`;
  let token = jwt.decode(req.headers.authorization.split(" ")[1]);
  if (token.role === "admin") {
    _db.query(queryAll, (error, results) => {
      if (error) {
        res.status(400).json({
          message: "Error"
        });
      } else {
        res.status(200).json(results);
      }
    });
  } else {
    _db.query(query, [token.userid], (error, results) => {
      if (error) {
        res.status(400).json({
          message: "Error"
        });
      } else {
        res.status(200).json(results);
      }
    });
  }
});

router.get('/detail/:id', checkAuth, (req, res) => {

  let id = req.params.id;
  let query = "SELECT * FROM device where id=?";

  _db.query(query, [id], (error, results) => {
    if (error) {
      res.status(400).json({
        message: "Error"
      });
    } else if (results.length < 1) {
      res.status(404).json({
        message: "Device not found"
      });
    } else {
      results[0].module_type = modulesArray[results[0].module_type - 1];
      res.status(200).json(results);
    }
  });
});

module.exports = router;
