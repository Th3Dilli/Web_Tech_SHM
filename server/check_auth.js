const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const publicKey = fs.readFileSync(path.join(__dirname, 'public.key'), 'utf8');
console.log(publicKey);

module.exports = (req, res, next) => {
    try {
        const header = req.headers.authorization.split(" ")[1];
        jwt.verify(header, publicKey, {
        algorithm: "RS256"
        });
        next();

    } catch (err) {
        return res.status(401).json({
        message: 'Authentication error'
        });
    }

    }
