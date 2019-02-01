const express = require("express");
const router = express.Router();
const checkAuth = require('../check_auth')
const getDb = require('../controller').getDb
const _db = getDb();
const modulesArray = require("../config_modules").modules;
const jwt = require('jsonwebtoken');

router.get('/all', checkAuth, (req, res) => {

  // OLD query for users with rooms restriction
  // let query = `SELECT  device_id, d.device_name, d.ip, d.mac,
  //  d.module_type, r.name 
  //  FROM users u, users_has_rooms uhr, rooms r, rooms_has_device rhd, device d  
  //  WHERE u.users_id = ? and uhr.users_users_id = u.users_id and r.rooms_id = uhr.rooms_rooms_id 
  //  and rhd.rooms_rooms_id = uhr.rooms_rooms_id and d.device_id = rhd.device_device_id;
	// `;
  let queryDevice = `SELECT distinct d.*, rhs.rooms_rooms_id, r.name 
  from device d, rooms_has_device rhs, rooms r 
  where d.device_id = rhs.device_device_id and r.rooms_id = rhs.rooms_rooms_id;`;
  
  let queryRooms = `SELECT * from rooms;`;

  let token = jwt.decode(req.headers.authorization.split(" ")[1]);
  
    _db.query(queryDevice, (error, results) => {
      if (error) {
        res.status(400).json({
          message: "Error"
        });
      } else {
        _db.query(queryRooms, (error2, results2) => {
          if (error) {
            res.status(400).json({
              message: "Error"
            });
          } else {
            let data = { "devices": results,
                          "rooms": results2
                        }
            res.status(200).json(data);
          }
        });
      }
    });
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
              message: "Success adding device"
            });
          }
        });
      });


    }
  });
});

router.delete('/deleteDevice/:id', checkAuth, (req, res) => {
  
  let device_id = req.params.id;
  console.log(device_id);
  let queryRoom = `DELETE FROM rooms_has_device WHERE (device_device_id = ?)`
  _db.query(queryRoom, [device_id], (error, result) => {

    if (error) {
      console.log(error)
      res.status(400).json({
        message: "Error Insert 2",
      });
    } else {
      let queryDevice = `DELETE FROM device WHERE (device_id = ?)`
      _db.query(queryDevice, [device_id], (error, result) => {

        if (error) {
          console.log(error)
          res.status(400).json({
            message: "Error Insert 2",
          });
        } else {
          res.status(200).json({
            message: "Device sucessful deleted"
          });
        }

      });

    }

  });

});

module.exports = router;
