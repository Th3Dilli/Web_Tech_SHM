const express = require('express');
const bodyParser = require('body-parser');
const checkAuth = require('./check_auth')
const db = require('./controller');
const PORT = 3000
const app = express();
const router = express.Router();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Content-Security-Policy", "default-src 'self'; script-src 'self'; style-src'self'");
    res.header("Access-Control-Allow-Methods", "POST, PATCH, GET, OPTIONS")
    next();
});


// Routes
let loginRoutes = require('./routes/login');
let deviceRoutes = require('./routes/device');
let userRoutes = require('./routes/updateUser');
let toggleDevice = require('./routes/toggleDevice');

app.use('/login', loginRoutes);
app.use('/devices', deviceRoutes);
app.use('/user', userRoutes);
app.use('/device', toggleDevice);

db.initDb.then(() => {
    app.listen(PORT, function () {
        console.log('Server running on localhost ' + PORT)
    });
}, () => {
    console.log("Failed to connect to DB!")
});