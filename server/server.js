const express = require('express');
const bodyParser = require('body-parser');
const db = require('./controller');

const PORT = 3000
const app = express();


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
const router = express.Router();

let login = require('./routes/login');

//landing page
app.use("/", router);
router.get("/", function (req, res) {
    res.json({
        mesage: 'Welcome to module api'
    });
});

router.post('/login', login.login);
app.get('/login', login.loginlanding);


db.initDb.then(() => {
    app.listen(PORT, function () {
        console.log('Server running on localhost ' + PORT)
    });
}, () => {
    console.log("Failed to connect to DB!")
});