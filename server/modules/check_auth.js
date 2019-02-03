/**
 * Checks if the user is authenticated and has a valid JWT token in the authorization header 
 * jwt.verfiy uses the public RSA key for verfiy the token with the RS256 algorithm.
 * all three parts of the jwt token header, payload, signature must be valid, else send 401 response
 * 
 * @author Markus Macher
 */

const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const publicKey = fs.readFileSync(path.join(__dirname, 'public.key'), 'utf8');

module.exports = (req, res, next) => {
    try {
        const header = req.headers.authorization.split(' ')[1];
        jwt.verify(header, publicKey, {
            algorithm: 'RS256'
        });
        next();
    } catch (err) {
        return res.status(401).json({
            message: 'Authentication error'
        });
    }
}
