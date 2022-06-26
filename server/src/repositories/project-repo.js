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

exports.registProject= (connection, projectInfo) => {
    return new Promise((resolve, reject) => {
        connection.query(projectQuery.insertProject(),
        [ projectInfo.projectName
        , projectInfo.projectDescription
        , projectInfo.projectDeletedStatus],

        (err, results, fields) => {

            if(err) {
                console.log(err);
                reject(err);
            }
            resolve(results);
        });
    });
};

exports.selectProjectWithProjectCode = (connection, projectCode) => {

    return new Promise((resolve, reject) => {
        connection.query(projectQuery.selectProjectWithProjectCode(), [projectCode], (err, results, fields) => {

            if(err) {
                console.log(err);
                reject(err);
            }

            const project = [];
            for(let i = 0; i < results.length; i++) {
                project.push(new ProjectDTO(results[i]));
            }

            resolve(project);
        });
    });
}

exports.registProjectMember = (connection, projectCode, authorityCode) => {

    return new Promise((resolve, reject) => {
        connection.query(projectQuery.registProjectMember(),
        [ projectCode, authorityCode],
        
        (err, results, fields) {

            if(err) {
                console.log(err);
                reject(err);
            }
            resolve(err);
        });
    });
} 