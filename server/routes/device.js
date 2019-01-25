const express = require("express");
const router = express.Router();
const checkAuth = require('../check_auth')
const getDb = require('../controller').getDb
const _db = getDb();
const modulesArray = require("../config_modules").modules;
const jwt = require('jsonwebtoken');

router.get('/all', checkAuth, (req, res) => {

  let query = `SELECT d.category, device_id, d.device_name, d.ip, d.mac,
   d.module_type, r.name 
   FROM users u, users_has_rooms uhr, rooms r, rooms_has_device rhd, device d  
   WHERE u.users_id = ? and uhr.users_users_id = u.users_id and r.rooms_id = uhr.rooms_rooms_id 
   and rhd.rooms_rooms_id = uhr.rooms_rooms_id and d.device_id = rhd.device_device_id;
	`;
  let queryAll = `SELECT d.category, device_id, d.device_name, d.ip, d.mac, d.module_type, r.name, u.users_id, u.username FROM users u, users_has_rooms uhr, rooms r, rooms_has_device rhd, device d  
  WHERE uhr.users_users_id = u.users_id and r.rooms_id = uhr.rooms_rooms_id 
  and rhd.rooms_rooms_id = uhr.rooms_rooms_id and d.device_id = rhd.device_device_id;
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
  let query = "SELECT * FROM device where device_id = ?";

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
      res.status(200).json(results);
    }
  });
});

module.exports = router;
