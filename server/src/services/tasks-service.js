const getConnection = require("../database/connection");
const TasksRepository = require("../repositories/tasks-repo");

// 전체 일감 목록 조회
exports.getTasks = (params) => {
  return new Promise((resolve, reject) => {
    const connection = getConnection();

    const results = TasksRepository.selectTasks(connection, params);

    connection.end();

    resolve(results);
  });
};


// 개별 일감 조회
exports.findTaskByTaskCode = (taskCode) => {
  return new Promise((resolve, reject) => {
    const connection = getConnection();

    const results = TasksRepository.selectTaskbyTaskCode(connection, taskCode);

    connection.end();

    resolve(results);
  });
};


// 개별 일감 생성
exports.registNewTask = (task) => {

    return new Promise(async (resolve, reject) => {
      const connection = getConnection();
      connection.beginTransaction();

      try {
        const insertedNewTask = await TasksRepository.insertNewTask(connection, task);
        console.log(insertedNewTask)
      
        connection.commit();
        const result = insertedNewTask

        resolve(result);

      } catch (err) {
        connection.rollback();

        reject(err);
      } finally {
        connection.end();
      }
    });
};



// 개별 일감 수정
exports.editTask = (params) => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();
    connection.beginTransaction();

    try {
      const results = await TasksRepository.updateTask(connection, params);

      connection.commit();

      resolve(results);
    } catch (err) {
      connection.rollback();

      reject(err);
    } finally {
      connection.end();
    }
  });
};



// 삭제 예시
// exports.deleteNewTask = (backlogCode, category) => {
//   return new Promise(async (resolve, reject) => {
//     const connection = getConnection();
//     connection.beginTransaction();

//     try {
//       const backlog = TasksRepository.selectTaskbyTaskCode(connection, backlogCode);
      
//       if(category === '백로그') {
//         TasksRepository.deleteBacklog(connection, backlogCode);
//       }

//       if(category === '일감') {
//         TasksRepository.deleteTask(connection, backlogCode);
//       }

//       백로그 삭제 / 일감 삭제
//       1. backlog_category === '백로그'
//       update backlog_delete_yn = 'y'
//       2. backlog_category === '일감'
//       update backlog_category = '백로그'

//       connection.commit();

//       resolve(result);
//     } catch (err) {
//       connection.rollback();

//       reject(err);
//     } finally {
//       connection.end();
//     }
//   });
// };