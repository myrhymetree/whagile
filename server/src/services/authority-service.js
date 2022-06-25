const getConnection = require('../database/connection');
const AuthorityRepository = require('../repositories/authority-repo');

exports.addAuth = (params) => {

    return new Promise((resolve, reject) => {
        
        const connection = getConnection();

        connection.beginTransaction();

        try {

            const results = AuthorityRepository.insertAuth(connection, params);

            connection.commit();

            resolve(results);
        } catch(err) {

            connection.rollback();

            reject(err);
        } finally {
            connection.end();
        }
    });
}

exports.viewAuths = (params) => {

    return new Promise((resolve, reject) => {
        
        const connection = getConnection();

        const results = AuthorityRepository.selectAuths(connection, params);

        connection.end();

        resolve(results);
    });
}

exports.viewAuth = (authorityCode) => {

    return new Promise((resolve, reject) => {
        
        const connection = getConnection();

        const results = AuthorityRepository.selectAuth(connection, authorityCode);

        connection.end();

        resolve(results);
    })
}

exports.editAuth = (params) => {

    return new Promise((resolve, reject) => {
        
        const connection = getConnection();

        connection.beginTransaction();

        try {

            const results = AuthorityRepository.updateAuth(connection, params);

            connection.commit();

            resolve(results);
        } catch(err) {

            connection.rollback();

            reject(err);
        } finally {
            connection.end();
        }
    });
}

exports.deleteAuth = (authorityCode) => {

    return new Promise((resolve, reject) => {
        
        const connection = getConnection();

        connection.beginTransaction();

        try {

            const results = AuthorityRepository.deleteAuth(connection, authorityCode);

            connection.commit();

            resolve(results);
        } catch(err) {

            connection.rollback();

            reject(err);
        } finally {
            connection.end();
        }
    });
}