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
