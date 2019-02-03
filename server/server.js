/**
 * This is the main server module that processes all requests, headers and 
 * provides all accessable routes using express middleware.
 * 
 * @author Markus Macher
 */

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./modules/database');
const cors = require('cors');
const path = require("path");
const PORT = require('./config/config').server.port;

app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));

// setting Headers
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Date, Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Content-Security-Policy', 'default-src self; script-src self; style-src self');
  res.header('Access-Control-Allow-Methods', 'POST, PATCH, GET, OPTIONS, DELETE')
  next();
});

// importing request handlers
const loginRoutes = require('./routes/login');
const deviceRoutes = require('./routes/device');
const userRoutes = require('./routes/updateUser');
const toggleDevice = require('./routes/toggleDevice');
const deviceState = require('././routes/deviceState');
const roomRoutes = require('././routes/room');

// route setup exress middleware
app.use('/login', loginRoutes);
app.use('/devices', deviceRoutes);
app.use('/user', userRoutes);
app.use('/device', toggleDevice);
app.use('/deviceState', deviceState);
app.use('/room', roomRoutes);

//404 page not found error page
let pagenotfound = path.join(__dirname, "./pagenotfound.html")
app.use(function (req, res, next) {
  res.status(404).sendFile(pagenotfound, {
    title: '404: File Not Found'
  });
});

// db initDb promise after initialization log the status success/failure callback
db.initDb.then(() => {
  app.listen(PORT, function () {
    console.log('Server running on localhost ' + PORT)
  });
}, () => {
  console.log('Failed to connect to DB!');
});
