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
        
        try {
            const result = await ProjectRepository.registProject(connection, projectInfo);
            
            // const loginMember = AccountUtils.decodedToken;
            const loginMember = 1;
            const authorityCode = 1;

            console.log("로그인한 회원", loginMember);

            const registMember = await ProjectRepository.registProjectMember(connection, result.insertId, authorityCode, loginMember);
            
            const registedProject = await ProjectRepository.selectProjectWithProjectCode(connection, result.insertId);

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
            const memberCode = 4;
            const updatedManager2 = await ProjectRepository.updateManager2(connection, projectInfo.projectCode, memberCode);
            const updatedProject = await ProjectRepository.selectProjectWithProjectCode(connection, projectInfo.projectCode);
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

exports.removeProject = (projectCode) => {

    return new Promise(async (resolve, reject) => {

        const connection = getConnection();
        connection.beginTransaction();
        
        try {
            await ProjectRepository.deleteProject(connection, projectCode);
            
            const removedProject = await ProjectRepository.selectProjectWithProjectCode(connection, projectCode);

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