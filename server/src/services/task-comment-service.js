const getConnection = require("../database/connection");
const TaskCommentRepository = require("../repositories/task-comment-repo");

//일감 댓글 조회
exports.findTaskAllComments = (params) => {
    return new Promise((resolve, reject) => {
      const connection = getConnection();

      const results = TaskCommentRepository.selectTaskAllComments(
        connection,
        params
      );

      connection.end();

      resolve(results);
    });
};

//일감 댓글 생성
exports.createTaskComment = (taskNewComment) => {
  return new Promise( async(resolve, reject) => {
    const connection = getConnection();
    connection.beginTransaction();

    try {
      const insertedTaskNewComment = await TaskCommentRepository.insertComment(
        connection,
        taskNewComment
      );

      connection.commit();

      const result = insertedTaskNewComment;
      resolve(result);
    } catch (err) {
      connection.rollback();

      reject(err);
    } finally {
      connection.end();
    }
  });
};

// 일감 댓글 수정
exports.updateTaskComment = (updateTaskCommentContent) => {

        
    return new Promise(async (resolve, reject) => {
      const connection = getConnection();
      connection.beginTransaction();

      try {
        await TaskCommentRepository.updateTaskComment(
          connection,
          updateTaskCommentContent
        );

        const modifiedTaskComment =
          await TaskCommentRepository.selectTaskComment(
            connection,
            updateTaskCommentContent.taskCommentCode
          );

        connection.commit();

        const result = {modifiedTaskComment: modifiedTaskComment};

        resolve(result);
      } catch (err) {
        connection.rollback();

        reject(err);
      } finally {
        connection.end();
      }
    });
};

// 일감 댓글 삭제
exports.deleteTaskComment = (removeTaskCommentRequest) => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();
    connection.beginTransaction();

    try {
      await TaskCommentRepository.deleteTaskComment(
        connection,
        removeTaskCommentRequest
      );

      const deletedTaskComment = await TaskCommentRepository.selectTaskComment(
        connection,
        removeTaskCommentRequest.taskCommentCode
      );

      connection.commit();

      const results = {deletedTaskComment: deletedTaskComment};

      resolve(results);
    } catch (err) {
      connection.rollback();

      reject(err);
    } finally {
      connection.end();
    }
  });
};
