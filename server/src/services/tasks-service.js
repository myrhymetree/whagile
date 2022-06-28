const getConnection = require("../database/connection");
const TasksRepository = require("../repositories/tasks-repo");

exports.getTasks = (params) => {
  return new Promise((resolve, reject) => {
    const connection = getConnection();

    const results = TasksRepository.selectTasks(connection, params);

    connection.end();

    resolve(results);
  });
};



exports.findTaskByTaskCode = (taskCode) => {
  return new Promise((resolve, reject) => {
    const connection = getConnection();

    const results = TasksRepository.selectTaskbyTaskCode(connection, taskCode);

    connection.end();

    resolve(results);
  });
};



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
