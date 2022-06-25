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