exports.login = function (req, res) {
    const getDb = require('../controller').getDb
    const crypto = require('crypto');
    const _db = getDb();
    let username = req.body.username;
    let password = req.body.password;

    const query = 'SELECT id, username FROM users WHERE username = ? AND password = ?';

    _db.query(query, [username, password], (error, results) => {
        if (error) {
            res.status(400).json({
                message: "Error occured"
            });

        } else if (results.length < 1) {
            res.status(401).json({
                message: "Username oder Passwort falsch"
            });

        } else {
            let randomNum = Math.floor(Math.random() * 10000);
            let userid = results[0].id;
            let username = results[0].username;

            const token = crypto.createHmac('sha256', userid.toString())
                .update(randomNum.toString())
                .digest('hex');

            let response = {
                username: username,
                token: token
            };
            res.status(200).json(response);

            let UpdateToken = 'UPDATE users SET token= ? where username= ? and id = ? ';

            _db.query(UpdateToken, [token, username, userid], (error) => {
                if (error) {
                    console.log("Failed to Insert in DB");
                    console.log(error);
                }

            });


        }
    });

}

exports.loginlanding = function (req, res) {

    res.send("loginlandingpage");

}