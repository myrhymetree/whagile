const getConnection = require("../database/connection");
const BacklogCommentRepository = require('../repositories/backlog-comment-repo');

exports.findBacklogComments = (params) => {

    return new Promise((resolve, reject) => {

        const connection = getConnection();

        const results = BacklogCommentRepository.selectBacklogComments(connection, params);
        
        connection.end();

        resolve(results);
    });
};