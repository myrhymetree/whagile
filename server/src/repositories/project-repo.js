const projectQuery = require('../database/project-query');
const ProjectDTO = require('../dto/project/project-response-dto');
const ProjectMemberDTO  = require('../dto/project/project-member-response-dto');

exports.selectProjects = (connection, params) => {
    return new Promise((resolve, reject) => {
        console.log('repo',params);
        connection.query(projectQuery.selectProjects(params), 
        (err, results, fields) => {

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
    console.log('selectProject', projectCode);
    return new Promise((resolve, reject) => {
        connection.query(projectQuery.selectProjectWithProjectCode(projectCode), 
        
        (err, results, fields) => {

            if(err) {
                console.log(err);
                reject(err);
            }

            const project = [];
            project.push(new ProjectDTO(results[0]));
            console.log('성공함?');
            resolve(project);
        });
    });
};

exports.registProject= (connection, projectInfo) => {
    return new Promise((resolve, reject) => {
        connection.query(projectQuery.insertProject(),
        [ projectInfo.projectName
        , projectInfo.projectDescription
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

exports.registProjectMember = (connection, projectCode, projectInfo ) => {
 
    return new Promise((resolve, reject) => {
        console.log("프로젝트번호는?", projectCode);
        connection.query(projectQuery.insertProjectMember(),
        [ projectInfo.loginMember, 
          1, 
          projectCode ],
        
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

exports.updateManager2 = (connection, projectCode, projectOwner ) => {
 
    return new Promise((resolve, reject) => {
        connection.query(projectQuery.updateProjectOwner2(),
        [ projectCode, projectOwner ],

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

exports.selectProjectMember = (connection, projectCode) => {
    return new Promise((resolve, reject) => {
        connection.query(projectQuery.selectProjectMember(projectCode),
        (err, results, fields) => {

            if(err) {
                console.log(err);
                reject(err);
            }

            const projectMember = [];
            for(let i = 0; i < results.length; i++) {
                projectMember.push(new ProjectMemberDTO(results[i]));
            }

            resolve(projectMember);
        });
    });
}

exports.insertProjectMember = (connection, data) => {
    return new Promise((resolve, reject) => {
        connection.query(projectQuery.insertProjectMember(),
        [ data.memberCode
        , data.authorityCode
        , data.projectCode
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

exports.deleteProjectMember = (connection, data) => {
    console.log(data);
    return new Promise((resolve, reject) => {
        connection.query(projectQuery.deleteProjectMember(data),
        
        (err,results, fields) => {

            if(err) {
                console.log(err);
                reject(err);
            }

            resolve(results);
        });
    });
}