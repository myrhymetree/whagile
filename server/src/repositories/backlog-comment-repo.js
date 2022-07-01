const backlogCommentQuery = require('../database/backlog-comment-query');
const BacklogCommentDTO = require('../dto/backlog-comment/backlog-comment-response-dto');

exports.selectBacklogComments = (connection, params) => {

    return new Promise((resolve, reject) => {

        const query = connection.query(
            backlogCommentQuery.selectBacklogComments(),
            [params.backlogCode, params.offset, params.limit],
            (err, results, fields) => {
                if(err) {
                    reject(err);
                }

                const backlogComments = [];
                for(let i = 0; i < results.length; i++) {
                    backlogComments.push(new BacklogCommentDTO(results[i]));
                }

                resolve(backlogComments);
            }
        );

        console.log(query.sql)
    });
};