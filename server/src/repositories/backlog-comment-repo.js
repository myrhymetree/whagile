const backlogCommentQuery = require('../database/backlog-comment-query');
const BacklogCommentDTO = require('../dto/backlog-comment/backlog-comment-response-dto');
const BacklogCommentHistoryDTO = require('../dto/backlog-comment/backlog-comment-history-response-dto');

/* 백로그 댓글 조회 요청 */
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

/* 백로그 댓글 생성 요청 */
exports.insertComment = (connection, newComment) => {

    return new Promise((resolve, reject) => {

        const query = connection.query(
            backlogCommentQuery.insertComment(),
            [newComment.content, newComment.createdDate, newComment.backlogCode, 
             newComment.projectCode, newComment.memberCode],
            (err, results, fields) => {

                if(err) {
                    reject(err);
                }

                resolve(results);
            }
        );

        console.log(query.sql)
    });
};

/* 백로그 댓글 히스토리 생성 요청 */
exports.insertBacklogCommentHistory = (connection, newHistory) => {

    return new Promise((resolve, reject) => {
        const query = connection.query(
            backlogCommentQuery.insertBacklogCommentHistory(newHistory),
            (err, results, fields) => {
                
                if(err) {
                    reject(err);
                }
    
                resolve(results);
            }
        );

        console.log(query.sql);
    });
};

/* 백로그 댓글 히스토리 조회 요청 */
exports.selectHistory = (connection, historyCode) => {

    return new Promise((resolve, reject) => {

        const query = connection.query(
            backlogCommentQuery.selectHistory(),
            historyCode, 
            (err, results, fields) => {

                if(err) {
                    reject(err);
                }

                const backlogHistory = [];
                for(let i = 0; i < results.length; i++) {
                    backlogHistory.push(new BacklogCommentHistoryDTO(results[i]));
                }

                resolve(backlogHistory);
            }
        );
    });
};