const express = require("express");
const router = express.Router();
const checkAuth = require('../check_auth')
const getDb = require('../controller').getDb
const _db = getDb();
const modulesArray = require("../config_modules").modules;
const jwt = require('jsonwebtoken');

router.get('/all', checkAuth, (req, res) => {

  let query = `SELECT  device_id, d.device_name, d.ip, d.mac,
   d.module_type, r.name 
   FROM users u, users_has_rooms uhr, rooms r, rooms_has_device rhd, device d  
   WHERE u.users_id = ? and uhr.users_users_id = u.users_id and r.rooms_id = uhr.rooms_rooms_id 
   and rhd.rooms_rooms_id = uhr.rooms_rooms_id and d.device_id = rhd.device_device_id;
	`;
  let queryAll = `SELECT distinct d.*, rhs.rooms_rooms_id, r.name 
  from device d, users u, rooms_has_device rhs, rooms r 
  where d.device_id = rhs.device_device_id and r.rooms_id = rhs.rooms_rooms_id;
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

router.post('/addDevice', checkAuth, (req, res) => {

  const module_type = req.body.module_type;
  const device_name = req.body.device_name;
  const ip = req.body.device_ip;
  const mac = req.body.device_mac;
  const roomName = req.body.room_name;
  let roomsID;

  let token = jwt.decode(req.headers.authorization.split(" ")[1]);
  const sql = 'INSERT INTO `device` (module_type, device_name, ip, mac) VALUES (?, ?, ?, ?);';

  _db.query(sql, [module_type, device_name, ip, mac], (error_I_D, results_I_D) => {
    if (error_I_D) {
      res.status(400).json({
        message: "Error Insert 1",
        error: error_I_D
      });
    } else {
      const sql2 = 'SELECT rooms_id from rooms where name = ?';

      _db.query(sql2, [roomName], (error_S_R, results_S_R) => {
        if (error_S_R) {
          res.status(400).json({
            message: "Error Select",
            error: error_S_R
          });
        } else {
          roomsID = results_S_R[0].rooms_id;
        }
        console.log("roomsID: " + roomsID);
        const insertId = results_I_D.insertId;
        const sql3 = 'INSERT INTO `rooms_has_device` (rooms_rooms_id, device_device_id) VALUES (?, ?);';

        _db.query(sql3, [roomsID, insertId], (error_I_RHD, results_I_RHD) => {
          if (error_I_RHD) {
            console.log(error_I_RHD);
            res.status(400).json({
              message: "Error Insert 2",
              error: error_I_RHD
            });
          } else {
            res.status(200).json({
              message: "all good"
            });
          }
        });
      });


    }
  });
});


// router.get('/detail/:id', checkAuth, (req, res) => {

//   let id = req.params.id;
//   let query = "SELECT * FROM device where device_id = ?";

//   _db.query(query, [id], (error, results) => {
//     if (error) {
//       res.status(400).json({
//         message: "Error"
//       });
//     } else if (results.length < 1) {
//       res.status(404).json({
//         message: "Device not found"
//       });
//     } else {
//       res.status(200).json(results);
//     }
//   });

// });

module.exports = router;
