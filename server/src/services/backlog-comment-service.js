const getConnection = require("../database/connection");
const BacklogCommentRepository = require('../repositories/backlog-comment-repo');

/* 히스토리 생성 함수 */
createNewHistory = () => {

    const newHistory = {
        historyType: '',
        historyDate: '',
        modifiedComment: null,
        backlogCommentCode: 0,
        projectCode: 0,
        memberCode: 0
    };

    return newHistory;
};

/* 백로그 댓글 조회 요청 */
exports.findBacklogComments = (params) => {

    return new Promise((resolve, reject) => {

        const connection = getConnection();

        const results = BacklogCommentRepository.selectBacklogComments(connection, params);
        
        connection.end();

        resolve(results);
    });
};

/* 백로그 댓글 생성 요청 */
exports.registComment = (newComment) => {

    return new Promise(async (resolve, reject) => {

        const connection = getConnection();
        connection.beginTransaction();

        try {
            /* 백로그 댓글 데이터 삽입 */
            const insertNewCommentResult = await BacklogCommentRepository.insertComment(connection, newComment);

            /* 백로그 댓글 히스토리 데이터 생성 */
            const newHistory = createNewHistory();
            newHistory.historyType = '생성';
            newHistory.historyDate = newComment.createdDate;
            newHistory.modifiedComment = newComment.content;
            newHistory.backlogCommentCode = insertNewCommentResult.insertId;
            newHistory.projectCode = newComment.projectCode;
            newHistory.memberCode = newComment.memberCode;

            /* 백로그 댓글 히스토리 데이터 삽입 */
            const insertNewHistoryResult = await BacklogCommentRepository.insertBacklogCommentHistory(connection, newHistory);

            /* 추가한 백로그 히스토리 행 조회 */
            const insertedHistory = await BacklogCommentRepository.selectHistory(connection, insertNewCommentResult.insertId);

            connection.commit();

            resolve(insertedHistory);
            
        } catch(err) {
            connection.rollback();

            reject(err);

        } finally {
            connection.end();
        }
    });
};