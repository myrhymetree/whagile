const getConnection = require('../database/connection');
const ProjectRepository = require('../repositories/project-repo');
const AccountUtils = require('../util/account-utils');

exports.selectProjects = (params) => {

    return new Promise((resolve, reject) => {

        const connection = getConnection();

        const results = ProjectRepository.selectProjects(connection, params);

        connection.end();

        resolve(results);
    });
};

exports.selectProject = (projectCode) => {

    return new Promise((resolve, reject) => {

        const connection = getConnection();
        
        const result = ProjectRepository.selectProject(connection, projectCode);

        connection.end();

        resolve(result);
    });
};

exports.registProject = (projectInfo) => {

    return new Promise(async (resolve, reject) => {

        const connection = getConnection();
        connection.beginTransaction();
        console.log(projectInfo);
        
        try {
            const result = await ProjectRepository.registProject(connection, projectInfo);
            
            const registMember = await ProjectRepository.registProjectMember(connection, result.insertId, projectInfo);
            
            const registedProject = await ProjectRepository.selectProject(connection, result.insertId);

            connection.commit();

            resolve(registedProject);
        } catch (err) {
            connection.rollback();

            reject(err);
        } finally {
            connection.end();
        }
    });
}

exports.modifyProject = (projectInfo) => {
    return new Promise(async (resolve, reject) => {
        
        const connection = getConnection();
        connection.beginTransaction();
        
        try {
            const updatedproject = await ProjectRepository.updateProject(connection, projectInfo);
            const updatedManager1 = await ProjectRepository.updateManager1(connection, projectInfo.projectCode);
            const updatedManager2 = await ProjectRepository.updateManager2(connection, projectInfo.projectCode, projectInfo.projectOwner);
            const updatedProject = await ProjectRepository.selectProject(connection, projectInfo.projectCode);
            connection.commit();

            resolve(updatedProject);
        } catch (err) {
            connection.rollback();

            reject(err);
        } finally {
            connection.end();
        }
    });
}

exports.removeProject = (data) => {

    console.log('service', data);

    return new Promise(async (resolve, reject) => {

        const connection = getConnection();
        connection.beginTransaction();
        
        try {
            await ProjectRepository.deleteProject(connection, data.projectCode);
            const removedProject = await ProjectRepository.selectProjects(connection, data);
            connection.commit();

            resolve(removedProject);
        } catch (err) {
            connection.rollback();

            reject(err);
        } finally {
            connection.end();
        }
    });
}

exports.findProjectMember = (projectCode) => {

    return new Promise(async (resolve, reject) => {

        const connection = getConnection();

        const results = ProjectRepository.selectProjectMember(connection, projectCode);

        connection.end();

        resolve(results);

    });
}

exports.registProjectMember = (data) => {
    
    return new Promise(async (resolve, reject) => {

        const connection = getConnection();
        connection.beginTransaction();
        
        try {
            const result = await ProjectRepository.insertProjectMember(connection, data);
            
            connection.commit();

            resolve(result);
        } catch (err) {
            connection.rollback();

            reject(err);
        } finally {
            connection.end();
        }
    });
}

exports.removeProjectMember = (data) => {

    return new Promise(async (resolve, reject) => {

        const connection = getConnection();
        connection.beginTransaction();

        try {
            const result = await ProjectRepository.deleteProjectMember(connection, data);

            const projectMember = await ProjectRepository.selectProjectMember(connection, data.projectCode);

            connection.commit();

            resolve(projectMember)

        } catch (err) {
            connection.rollback();

            reject(err);
        } finally {
            connection.end();
        }
    });
}

exports.findRegistedMember = (data) => {

    return new Promise((resolve, reject) => {

        const connection = getConnection();

        const results = ProjectRepository.selectRegistedMember(connection, data);

        console.log('service',results);

        connection.end();

        resolve(results);
    });
};