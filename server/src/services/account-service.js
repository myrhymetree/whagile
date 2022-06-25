const getConnection = require('../database/connection');
const AccountRepository = require('../repositories/account-repo');
const AccountUtils = require('../util/account-utils');



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

            const validationID = await AccountRepository.selectAccountWithMemberId(connection, memberInfo.memberId);
            console.log('validationID', validationID);

            if(validationID.length > 0){
                connection.rollback();
                console.log('Already registered');
                return reject("Already registered");
            }

            memberInfo.password = await AccountUtils.setPassword(memberInfo.password);
    
            const result = await AccountRepository.registerAccount(connection, memberInfo);

            const insertedAccount = await AccountRepository.selectAccountWithMemberCode(connection, result.insertId);
            console.log('insertedAccount', insertedAccount);

            connection.commit();
    
            resolve(insertedAccount);

        } catch (err) {
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


            //패스워드 일치
            // const result = await AccountRepository.updateLastLogin(connection, loginInfo.memberId);
            // if(result.changedRows < 1){
            //     // 마지막 로그인 수정 실패
            //     connection.rollback();
            //     return reject("Failed LastLogin update!!");
            // }

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


exports.activationAccount = (memberInfo) => {
    console.log(memberInfo);
}