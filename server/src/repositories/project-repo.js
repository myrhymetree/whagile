const projectQuery = require('../database/project-qurery');
const ProjectDTO = require('../dto/project/project-response-dto');

exports.selectProjects = (connection) => {
    return new Promise((resolve, reject) => {
        connection.query(projectQuery.selectProjects(), (err, results, fields) => {

            if(err) {
                console.log(err);
                reject(err);
            }

            const project = [];
            for(let i = 0; i < results.length; i++) {
                project.push(new ProjectDTO(results[i]));
            }

            console.log('project', project);

            resolve(project);
        });
    });
};