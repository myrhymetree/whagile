const getConnection = require('../database/connection');
const SprintRepository = require('../repositories/sprint-repo');
const TasksRepository = require('../repositories/tasks-repo');

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

    return new Promise(async (resolve, reject) => {
        
        const connection = getConnection();

        const sprints = await SprintRepository.selectSprints(connection, params);
        
        for(let i = 0; i < sprints.length; i++) {
            sprints[i].tasks = await SprintRepository.selectTasks(connection, {sprintCode: sprints[i].sprintCode});
        }

        connection.end();

        resolve(sprints);
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

    return new Promise(async (resolve, reject) => {
        
        const connection = getConnection();

        const sprints = await SprintRepository.selectSprint(connection, sprintCode);
        
        sprints[0].tasks = await SprintRepository.selectTasks(connection, {sprintCode: sprints[0].sprintCode});
        
        connection.end();
        
        resolve(sprints);
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