const express = require('express');
const router = express.Router();
const checkAuth = require('../modules/check_auth')
const getDb = require('../modules/database').getDb
const _db = getDb();

router.post('/addRoom', checkAuth, (req, res) => {
  let roomname = req.body.room_name;
  const query = `INSERT INTO rooms (name) VALUES (?)`

  _db.query(query, [roomname], (error, results) => {

    if (error) {
      if (error.sqlMessage.includes('Duplicate entry')) {
        res.status(400).json({
          message: 'Duplicate entry'
        });
      } else {
        res.status(400).json({
          message: 'Error'
        });
      }
    } else {
      res.status(200).json({
        message: 'Room added'
      });
    }
  });
});

router.patch('/deleteRoom', checkAuth, (req, res) => {
  let roomname = req.body.room_name;
  let queryRoom = `DELETE FROM rooms WHERE (name = ?)`
  _db.query(queryRoom, [roomname], (error, result) => {
    if (error) {
      if (error.code.includes('ER_ROW_IS_REFERENCED')) {
        res.status(400).json({
          message: 'Can\'t delete Room with Devices in it'
        });
      } else {
        res.status(400).json({
          message: 'Error'
        });
      }
    } else {
      res.status(200).json({
        message: 'Room deleted'
      });
    }
  });
});

module.exports = router;
