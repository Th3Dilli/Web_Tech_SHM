/**
 * This function handles all http requests for the devices like ADD, REMOVE, EDIT and GET all the DEVICES
 *
 * ADD
 * adds a new device and inserts the correct connection to the room
 * 
 * REMOVE
 * removes a new device and its connection to the room
 * 
 * EDIT
 * updated a device
 * 
 * GET all
 * returns all devices that are in the database
 * 
 * @author Manuel Dielacher, Markus Macher
 */

const express = require('express');
const router = express.Router();
const checkAuth = require('../modules/check_auth')
const getDb = require('../modules/database').getDb
const _db = getDb();
const testMode = require('../config/config').testMode;
const devices = require('../modules/testMode/devices');

router.get('/all', checkAuth, (req, res) => {

  const queryDevice = `SELECT distinct d.*, rhs.rooms_rooms_id, r.name 
  from device d, rooms_has_device rhs, rooms r 
  where d.device_id = rhs.device_device_id and r.rooms_id = rhs.rooms_rooms_id;`;

  const queryRooms = `SELECT * from rooms;`;

  _db.query(queryDevice, (error_devices, results_devices) => {
    if (error_devices) {
      res.status(400).json({
        message: 'Error'
      });
    } else {
      _db.query(queryRooms, (error_rooms, results_rooms) => {
        if (error_rooms) {
          res.status(400).json({
            message: 'Error'
          });
        } else {
          let data = {
            'devices': results_devices,
            'rooms': results_rooms
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
  let roomsID = -1;

  if (testMode) {
    devices.addDevice(ip, module_type);
  }

  const sql_insert_d = 'INSERT INTO `device` (module_type, device_name, ip, mac) VALUES (?, ?, ?, ?);';
  _db.query(sql_insert_d, [module_type, device_name, ip, mac], (error_I_D, results_I_D) => {
    if (error_I_D) {
      res.status(400).json({
        message: 'Error adding Device '
      });
    } else {
      const sql_select = 'SELECT rooms_id from rooms where name = ?';
      _db.query(sql_select, [roomName], (error_S_R, results_S_R) => {
        if (error_S_R) {
          res.status(400).json({
            message: 'Error adding Device '
          });
        } else {
          roomsID = results_S_R[0].rooms_id;
        }
        if (roomsID !== -1) {
          const insertId = results_I_D.insertId;
          const sql_insert_rhd = 'INSERT INTO `rooms_has_device` (rooms_rooms_id, device_device_id) VALUES (?, ?);';
          _db.query(sql_insert_rhd, [roomsID, insertId], (error_I_RHD, results_I_RHD) => {
            if (error_I_RHD) {
              console.log(error_I_RHD);
              res.status(400).json({
                message: 'Error adding Device '
              });
            } else {
              res.status(200).json({
                message: 'Success adding device'
              });
            }
          });
        } else {
          console.log("Error inserting room into Database");
          res.status(400).json({
            message: 'Error adding Device '
          });
        }
      });
    }
  });
});

router.delete('/deleteDevice/:id', checkAuth, (req, res) => {
  let device_id = req.params.id;
  if (testMode) {
    _db.query('SELECT ip from `device` WHERE device_id = ?', [device_id], (error, result) => {
      if (error) {
        console.log('Error failed to get data for testMode deleteDevice');
      } else {
        devices.removeDevice(result[0].ip);
      }
    });
  }
  let queryRoom = `DELETE FROM rooms_has_device WHERE (device_device_id = ?)`
  _db.query(queryRoom, [device_id], (error, result) => {
    if (error) {
      console.log(error)
      res.status(400).json({
        message: 'Error deleting Device',
      });
    } else {
      let queryDevice = `DELETE FROM device WHERE (device_id = ?)`
      _db.query(queryDevice, [device_id], (error, result) => {
        if (error) {
          console.log(error)
          res.status(400).json({
            message: 'Error deleting Device',
          });
        } else {
          res.status(200).json({
            message: 'Device sucessful deleted'
          });
        }
      });
    }
  });
});

router.patch('/edit', checkAuth, (req, res) => {
  if (testMode) {
    _db.query('SELECT ip,module_type  from `device` WHERE device_id = ?', [req.body.editDevice_id], (error, result) => {
      if (error) {
        console.log('Error failed to get data for testMode editDevice');
      } else {
        devices.editDevice(result[0].ip, result[0].module_type, req.body.editDevice_ip);
      }
    });
  }
  const sql = 'UPDATE `device` SET device_name = ?, ip = ?, mac = ? WHERE device_id = ?;';

  _db.query(sql, [req.body.editDevice_name, req.body.editDevice_ip, req.body.editDevice_mac, req.body.editDevice_id], (error, results) => {
    if (error) {
      res.status(404).json({
        message: error.message,
      });
    } else {
      res.status(200).json({
        message: 'Update Successful',
      });
    }
  });
});

module.exports = router;
