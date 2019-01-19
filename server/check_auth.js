const getDb = require('./controller').getDb;
const cfg = require('./config_db');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        if (req.headers.authorization !== undefined) {
            const header = req.headers.authorization.split(" ")[1];
            jwt.verify(header, cfg.jwtkey.JWT_KEY, {
                algorithm: "HS256"
            });
            next();
        }
    } catch(err) {
        return res.status(401).json({
            message: 'Authentication error'
        });
    }

}
