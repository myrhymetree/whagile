const getConnection = require('../database/connection');
const ProjectRepository = require('../repositories/project-repo');

exports.selectProjects = () => {

    return new Promise((resolve, reject) => {

        const connection = getConnection();

        const results = ProjectRepository.selectProjects(connection);

        connection.end();

        resolve(results);
    });
};

exports.registProject = (projectInfo) => {

    return new Promise(async (resolve, reject) => {

        const connection = getConnection();
        connection.beginTransaction();

        try {
            const result = await ProjectRepository.registProject(connection, projectInfo);

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