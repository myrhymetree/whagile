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
      const insertedNewTask = await TasksRepository.insertNewTask(
        connection,
        task
      );

      connection.commit();
      const result = insertedNewTask;

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
