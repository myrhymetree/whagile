const accountQuery = require('../database/account-query');
const MemberDTO = require('../dto/account/account-response-dto');


exports.selectAccounts = (connection) => {

    return new Promise((resolve, reject) => {
        connection.query(accountQuery.selectMembers(), (err, results, fields) => {

            if(err) {
                console.log(err);
                reject(err);
            }

            const member = [];
            for(let i = 0; i < results.length; i++) {
                member.push(new MemberDTO(results[i]));
            }

            console.log('member', member);

            resolve(member);
        });
    });
};

exports.selectAccountWithMemberCode = (connection, memberCode) => {

    return new Promise((resolve, reject) => {
        connection.query(accountQuery.selectMemberWithMemberCode(), [memberCode], (err, results, fields) => {

            if(err) {
                console.log(err);
                reject(err);
            }

            const member = [];
            for(let i = 0; i < results.length; i++) {
                member.push(new MemberDTO(results[i]));
            }

            resolve(member);
        });
    });
}


exports.registerAccount = (connection, memberInfo) => {

    console.log('registerAccount called');

    return new Promise((resolve, reject) => {

        connection.query(accountQuery.insertMember(), 
            [ 
              memberInfo.id
            , memberInfo.password
            , memberInfo.name
            , memberInfo.email
            , memberInfo.phone
            , memberInfo.company
            , memberInfo.occupation
            , memberInfo.purpose            
        ],
        
        (err, results, fields) => {
                
            if(err) {
                console.log(err);
                reject(err);
            }
            resolve(results);
        });
    });
}

exports.selectAccountWithMemberId = (connection, memberId) => {

    return new Promise((resolve, reject) => {
        connection.query(accountQuery.selectMemberWithMemberId(), [memberId], (err, results, fields) => {

            if(err) {
                console.log(err);
                reject(err);
            }

            const member = [];
            for(let i = 0; i < results.length; i++) {
                member.push(new MemberDTO(results[i]));
            }

            resolve(member);
        });
    });
}

exports.updateAccountWithToken = (connection, memberCode) => {
    return new Promise((resolve, reject) => {
        console.log('repo', memberCode);
        connection.query(accountQuery.updateAccountWithToken(), [memberCode], (err, results, fields) => {

            if(err) {
                console.log(err);
                reject(err);
            }

            if(results.changedRows < 1){
                console.log('DB UPDATE FAILED!');
                reject('DB UPDATE FAILED!');
            }

            console.log('DB Process', results);

            resolve(results);
        });
    });
}


exports.selectAccountWithEmail = (connection, email) => {
    return new Promise((resolve, reject) => {
        
        console.log('selectAccountWithEmail', email);
        connection.query(accountQuery.selectMemberWithEmail(), [email], (err, results, fields) => {

            if(err) {
                console.log(err);
                reject(err);
            }

            const member = [];
            for(let i = 0; i < results.length; i++) {
                member.push(new MemberDTO(results[i]));
            }

            resolve(member);
        });
    });
}

exports.selectAccountWithMemberIdAndEmail = (connection, memberInfo) => {
    return new Promise((resolve, reject) => {
        
        console.log('selectAccountWithEmail', memberInfo);
        connection.query(accountQuery.selectMemberWithEmail(), [memberInfo.email, memberInfo.id]
        , (err, results, fields) => {

            if(err) {
                console.log(err);
                reject(err);
            }

            const member = [];
            for(let i = 0; i < results.length; i++) {
                member.push(new MemberDTO(results[i]));
            }

            resolve(member);
        });
    });
}

exports.updatePwd = (connection, tempInfo) => {

    return new Promise((resolve, reject) => {
        console.log('accountQuery', tempInfo);
        connection.query(
            accountQuery.updateAccountWithTempPWD(), 
            [tempInfo.password, tempInfo.memberCode], 
            (err, results, fields) => {

                if(err) {
                    console.log(err);
                    reject(err);
                }

                if(results.changedRows < 1){
                    console.log('DB UPDATE FAILED!');
                    reject('DB UPDATE FAILED!');
                }

                console.log('DB Process', results);

                resolve(results);
            });
    });
    
};