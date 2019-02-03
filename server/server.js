const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./modules/database');
const cors = require('cors');

const PORT = require('./config/config').server.port;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Content-Security-Policy', 'default-src self; script-src self; style-srcself');
    res.header('Access-Control-Allow-Methods', 'POST, PATCH, GET, OPTIONS')
    next();
});
app.use(cors());

// Routes setup
const loginRoutes = require('./routes/login');
const deviceRoutes = require('./routes/device');
const userRoutes = require('./routes/updateUser');
const toggleDevice = require('./routes/toggleDevice');
const deviceState = require('././routes/deviceState');
const roomRoutes = require('././routes/room');

app.use('/login', loginRoutes);
app.use('/devices', deviceRoutes);
app.use('/user', userRoutes);
app.use('/device', toggleDevice);
app.use('/deviceState', deviceState);
app.use('/room', roomRoutes);

db.initDb.then(() => {
    app.listen(PORT, function () {
        console.log('Server running on localhost ' + PORT)
    });
}, () => {
    console.log('Failed to connect to DB!');
});