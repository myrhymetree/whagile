const projectQuery = require('../database/project-query');
const ProjectDTO = require('../dto/project/project-response-dto');

exports.selectProjects = (connection, params) => {
    return new Promise((resolve, reject) => {
        connection.query(projectQuery.selectProjects(params), (err, results, fields) => {

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

exports.selectProject = (connection, projectCode) => {
    return new Promise((resolve, reject) => {
        connection.query(projectQuery.selectProjectWithProjectCode(),
        [ projectCode ], 
        
        (err, results, fields) => {

            if(err) {
                console.log(err);
                reject(err);
            }

            resolve(results);
        });
    });
};

exports.registProject= (connection, projectInfo) => {
    return new Promise((resolve, reject) => {
        connection.query(projectQuery.insertProject(),
        [ projectInfo.projectName
        , projectInfo.projectDescription
        , projectInfo.projectDeletedStatus
        ],
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

            console.log(projectCode);
            const project = [];
            for(let i = 0; i < results.length; i++) {
                project.push(new ProjectDTO(results[i]));
            }

            resolve(project);
        });
    });
}

exports.registProjectMember = (connection, projectCode, authorityCode, memberCode ) => {
 
    return new Promise((resolve, reject) => {
        console.log("프로젝트번호는?", projectCode);
        console.log("권한번호는?", authorityCode);
        console.log("멤버번호는?", memberCode);
        connection.query(projectQuery.insertProjectMember(),
        [ memberCode, authorityCode, projectCode ],
        
        (err, results, fields) => {

            if(err) {
                console.log(err);
                reject(err);
            }

            resolve(results);
        });
    });
}

exports.updateProject = (connection, projectInfo ) => {
 
    return new Promise((resolve, reject) => {
        connection.query(projectQuery.updateProject(),
        [ projectInfo.projectName
        , projectInfo.projectDescription
        , projectInfo.projectCode ],
        
        (err, results, fields) => {

            if(err) {
                console.log(err);
                reject(err);
            }

            resolve(results);
        });
    });
}

exports.updateManager1 = (connection, projectCode ) => {
 
    return new Promise((resolve, reject) => {
        connection.query(projectQuery.updateProjectOwner1(),
        [ projectCode ],
        
        (err, results, fields) => {

            if(err) {
                console.log(err);
                reject(err);
            }

            resolve(results);
        });
    });
}

exports.updateManager2 = (connection, projectCode, memberCode ) => {
 
    return new Promise((resolve, reject) => {
        connection.query(projectQuery.updateProjectOwner2(),
        [ projectCode, memberCode ],

        (err, results, fields) => {

            if(err) {
                console.log(err);
                reject(err);
            }

            resolve(results);
        });
    });
}

exports.deleteProject = (connection, projectCode) => {

    return new Promise((resolve, reject) => {
        connection.query(projectQuery.deleteProject(),
        [ projectCode ],
        (err, results, fields) => {

            if(err) {
                console.log(err);
                reject(err);
            }

            resolve(results);
        });
    });
}