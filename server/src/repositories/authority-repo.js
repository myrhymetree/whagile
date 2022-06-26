const authorityQuery = require('../database/authority-query');
const AuthorityDTO = require('../dto/authority/authority-response-dto');

exports.insertAuth = (connection, params) => {

    return new Promise((resolve, reject) => {

        connection.query(
            authorityQuery.insertAuth(),
            [params.authorityName, params.authorityActivatedYn, parseInt(params.authorityExposureOrder), params.authorityDescription],
            (err, results, fields) => {
                if(err) {
                    reject(err);
                }
                
                resolve(results);
            }
        );
    });
}

exports.selectAuths = (connection, params) => {
    
    return new Promise((resolve, reject) => {

        const queryParams = [
            parseInt(params.offset)
            , parseInt(params.limit)
        ];

        const whereClause = params.searchCondition && `WHERE ${'AUTHORITY_' + params.searchCondition.toUpperCase()} LIKE '%${params.searchValue}%'`;

        connection.query(authorityQuery.selectAuths(whereClause), queryParams, (err, results, fields) => {

            if(err) {
                reject(err);
            }

            const auths = [];
            for(let i = 0; i < results.length; i++) {
                auths.push(new AuthorityDTO(results[i]));
            }

            resolve(auths);
        });
    });
}

exports.selectAuth = (connection, authorityCode) => {
    
    return new Promise((resolve, reject) => {
        
        connection.query(authorityQuery.selectAuth(), [authorityCode], (err, results, fields) => {

            if(err) reject(err);

            const auths = [];
            for(let i = 0; i < results.length; i++) {
                auths.push(new AuthorityDTO(results[i]));
            }            

            resolve(auths);
        })
    });
}

exports.updateAuth = (connection, params) => {

    return new Promise((resolve, reject) => {

        connection.query(
            authorityQuery.updateAuth(),
            [params.authorityName, params.authorityActivatedYn, parseInt(params.authorityExposureOrder), params.authorityDescription, parseInt(params.authorityCode)],
            (err, results, fields) => {
                if(err) {
                    reject(err);
                }
                
                resolve(results);
            }
        );
    });
}

exports.deleteAuth = (connection, authorityCode) => {

    return new Promise((resolve, reject) => {
        connection.query(
            authorityQuery.deleteAuth(),
            [parseInt(authorityCode)],
            (err, results, fields) => {
                if(err) {
                    reject(err);
                }
                
                resolve(results);
            }
        );
    });
}