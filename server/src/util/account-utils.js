const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

exports.setPassword = (password) => {
    console.log('setPassword called');
    
    return bcrypt.hash(password, 10);;
}

exports.checkPassword = (password, passwordHash) => {
    return bcrypt.compare(password, passwordHash);
}


exports.generateToken = (memberCode, memberId, memberName, memberEmail) => {
    return new Promise((resolve, reject) => {

        jwt.sign(
            {
                code: memberCode,
                id: memberId,
                username: memberName,
                email: memberEmail
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '7d'
            },
            (err, token) => {
                if(err) {
                    console.log(err);
                    reject(err);
                } else {
                    console.log('generated token', token);
                    resolve(token);
                }
            }
        );    
    });

}

exports.decodedToken = (token) => {

    const result = jwt.verify(token, JWT_SECRET);

    const decodedToken = {
        //usercode: result.usercode,
        id: result.id,
        username: result.username,
        email: result.email,
    };

    return decodedToken;
};