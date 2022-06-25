const jwt = require('jsonwebtoken');
const AccountUtils = require('../util/account-utils')
require('dotenv').config();
const { JWT_SECRET } = process.env;

const verifyToken = (req, res, next) => {
   
    const token = req.header('Access_token');

    if(!token) {
        return res.status(401).json({
            message: "No token provided!"
        });
    }

    jwt.verify(token, JWT_SECRET, (err, decodedInfo) => {
        if (err) {
            return res.status(401).json({
                message: "Unauthorized!"
            });
        }     

        console.log('authJWT : ', AccountUtils.decodedToken(token));

        if( decodedInfo.exp - Math.floor(Date.now() / 1000) < 60 * 60 * 24 * 3.5) {
            const token = AccountUtils.generateToken(decodedInfo.code,decodedInfo.id, decodedInfo.username, decodedInfo.email);
            console.log('refresh token.......................');
            res
            .cookie('access_token', token, {
                maxAge: 1000 * 60 * 60 * 24 * 7,     // 7일
                httpOnly: true
            });
        }
        
        next();
    });      
}


const authJwt = {
    verifyToken
};

module.exports = authJwt;