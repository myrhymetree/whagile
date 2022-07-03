const getConnection = require('../database/connection');
const SprintRepository = require('../repositories/sprint-repo');

exports.addSprint = (params) => {

    return new Promise((resolve, reject) => {
        
        const connection = getConnection();
    
        connection.beginTransaction();

        try {

            const results = SprintRepository.insertSprint(connection, params);

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

exports.viewSprints = (params) => {

    return new Promise((resolve, reject) => {
        
        const connection = getConnection();

        const results = SprintRepository.selectSprints(connection, params);

        connection.end();

        resolve(results);
    });
}

exports.viewSprintHistory = (params) => {

    return new Promise((resolve, reject) => {
        
        const connection = getConnection();

        const results = SprintRepository.selectSprintHistory(connection, params);

        connection.end();

        resolve(results);
    });
}

exports.viewSprint = (sprintCode) => {

    return new Promise((resolve, reject) => {
        
        const connection = getConnection();

        const results = SprintRepository.selectSprint(connection, sprintCode);

        connection.end();

        resolve(results);
    });
}

exports.editSprint = (params) => {

    return new Promise((resolve, reject) => {
        
        const connection = getConnection();

        connection.beginTransaction();

        try {

            const results = SprintRepository.updateSprint(connection, params);

            connection.commit();

            resolve(results);
        } catch (err) {

            connection.rollback();

            reject(err);
        } finally {
            
            connection.end();
        }
    })
}

exports.deleteSprint = (params) => {

    return new Promise((resolve, reject) => {
        
        const connection = getConnection();

        connection.beginTransaction();

        try {

            const results = SprintRepository.deleteSprint(connection, params);

            connection.commit();

            resolve(results);
        } catch (err) {

            connection.rollback();

            reject(err);
        } finally {
            
            connection.end();
        }
    })
}