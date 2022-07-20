const taskCommentDTO = require("../dto/tasks/task-comment-response-dto");
const taskCommentQuery = require("../database/task-comment-query")

// 일감 댓글 조회
exports.selectTaskAllComments = (connection, params) => {
     return new Promise((resolve, reject) => {
       const query = connection.query(
         taskCommentQuery.findAllTaskComments(),
         [params.taskCode, params.offset, params.limit],
         (err, results, fields) => {
           if (err) {
             reject(err);
           }

           const taskComments = [];
           for (let i = 0; i < results.length; i++) {
             taskComments.push(new taskCommentDTO(results[i]));
           }

           resolve(taskComments);
         }
       );

    //    console.log("selectAll", query.sql);
     });

};

// 개별 댓글 조회
exports.selectTaskComment = (connection, taskCommentCode) => {
  return new Promise((resolve, reject) => {
    const query = connection.query(
      taskCommentQuery.getTaskComment(),
      taskCommentCode,
      (err, result, fields) => {
        if (err) {
          reject(err);
        }

        const taskComment = [];
        for (let i = 0; i < result.length; i++) {
          taskComment.push(new taskCommentDTO(result[i]));
        }

        resolve(taskComment);
      }
    );
    // console.log("taskComment",query.sql);
  });
};


// 개별 댓글 등록
exports.insertComment = (connection, taskNewComment) => {
       return new Promise((resolve, reject) => {
         const query = connection.query(
           taskCommentQuery.registTaskComment(),
           [
             taskNewComment.taskCommentContent,
            //  taskNewComment.taskCommentCreatedDate,
             taskNewComment.taskCode,
             taskNewComment.projectCode,
             taskNewComment.memberCode,
           ],
           (err, result, fields) => {
             if (err) {
               reject(err);
             }

             resolve(result);
           }
         );

        //  console.log("insertComment",query.sql);
       });

};

// 개별 댓글 수정
exports.updateTaskComment = (connection, updateTaskCommentContent) => {
  return new Promise((resolve, reject) => {
    const query = connection.query(
      taskCommentQuery.updateTaskComment(),
      [
        updateTaskCommentContent.taskCommentContent,
        // updateTaskCommentContent.taskCommentModifiedDate,
        updateTaskCommentContent.taskCommentCode,
      ],
      (err, result, fields) => {
        if (err) {
          reject(err);
        }

        resolve(result);
      }
    );
  });
};

// 개별 댓글 삭제
exports.deleteTaskComment = (connection, removeTaskCommentRequest) => {
  return new Promise((resolve, reject) => {
    const query = connection.query(
      taskCommentQuery.deleteTaskComment(),
      removeTaskCommentRequest.taskCommentCode,
      (err, result, fields) => {
        if (err) {
          reject(err);
        }

        resolve(result);
      }
    );
    // console.log("deleteTaskComment", query.sql);
  });
};
