const getConnection = require('../database/connection');
const AccountRepository = require('../repositories/account-repo');
const AccountUtils = require('../util/account-utils');
const EmailUtils = require('../util/email-utils');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;


exports.selectAccounts = () => {

    return new Promise((resolve, reject) => {

        const connection = getConnection();

        const results = AccountRepository.selectAccounts(connection);

        connection.end();

        resolve(results);
    });
};

exports.selectAccountWithMemberCode = (memberCode) => {

    return new Promise((resolve, reject) => {

        const connection = getConnection();

        const results = AccountRepository.selectAccountWithMemberCode(connection, memberCode);

        connection.end();

        resolve(results);
    });
}

exports.registerAccount = (memberInfo) => {


    return new Promise(async (resolve, reject) => {

        const connection = getConnection();
        connection.beginTransaction();

        try{

            const validationID = await AccountRepository.selectAccountWithMemberId(connection, memberInfo.id);
            console.log('validationID', validationID[0]);

            if(validationID[0]){
                console.log('Already registered');
                connection.rollback();
                return reject("Already registered");
            }

            console.log('registerAccountBefore', memberInfo);
            memberInfo.password = await AccountUtils.setPassword(memberInfo.password);
    
            console.log('registerAccountAfter', memberInfo);
            const result = await AccountRepository.registerAccount(connection, memberInfo);

            const insertedAccount = await AccountRepository.selectAccountWithMemberCode(connection, result.insertId);
            console.log('insertedAccount', insertedAccount);
            
            connection.commit();

            // 이메일 인증을 위한 토큰 발급
            const token = await AccountUtils.generateToken(insertedAccount.memberCode, insertedAccount.memberId, insertedAccount.name, insertedAccount.email);
            
            
            //이메일 발송 프로세스
            await EmailUtils.sendMail(insertedAccount[0], token);
    
            resolve(insertedAccount);

        } catch (err) {
            console.log(err);
            connection.rollback();
            console.log('rooback succeeded');

            reject(err);
        } finally {
            connection.end();
            console.log('connection closed succeeded');
        }

    });
}


exports.loginAccount = (loginInfo) => {


    return new Promise(async (resolve, reject) => {
        
        const connection = getConnection();
        connection.beginTransaction();

        try{
            console.log('loginInfo', loginInfo);

            const results = await AccountRepository.selectAccountWithMemberId(connection, loginInfo.memberId);

            //검색되는 회원이 없을경우
            if(results.length < 1) {
                console.log('Invalid username or password');
                return reject('Invalid username or password');
            }

            const passwordCompareResult = await AccountUtils.checkPassword(loginInfo.password, results[0].password);
            console.log('passwordCompareResult',passwordCompareResult);


            if(!passwordCompareResult){
                // 패스워드 불일치
                console.log('Invalid username or password');
                return reject("Invalid username or password");
            } 



            const account = await AccountRepository.selectAccountWithMemberId(connection, loginInfo.memberId);

            //로그인 성공시 JWT 토큰 발급 ()emberId, memberName, memberEmail)
            const token = await AccountUtils.generateToken(account[0].memberCode, account[0].memberId, account[0].name, account[0].email);
            
            const resData = {
                account,
                token
            }
            
            connection.commit();

            return resolve(resData);
            
        
        } catch (err) {

            console.log(err);
            connection.rollback();
            reject(err);

        } finally {

            connection.end();
            console.log('connection closed succeeded');
        }

        
    });
};


exports.emailAuthWithToken = (authInfo) => {
    
    return new Promise((resolve, reject) => {

        const connection = getConnection();
                                            
        if(!authInfo.token) {
            reject("No token provided!");
        }
    
        jwt.verify(authInfo.token, JWT_SECRET, (err, decodedInfo) => {
            if (err) {
                return res.status(401).json({
                    message: "Unauthorized!"
                });
            }     
        });      

        const results = AccountRepository.updateAccountWithToken(connection, authInfo.id);

        connection.end();

        resolve(results);
    });

}