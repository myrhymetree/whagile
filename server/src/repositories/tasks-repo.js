const tasksQuery = require("../database/tasks-query");
const TasksDTO = require("../dto/tasks/tasks-response-dto");

exports.selectTasks = (connection, params) => {
  return new Promise((resolve, reject) => {
    const query = connection.query(
      tasksQuery.selectTasks(params),
      (err, results, fields) => {
        if (err) {
          reject(err);
          console.log("selectTasks error: ", err);
        }

        const tasks = [];
        for (let i = 0; i < results.length; i++) {
          tasks.push(new TasksDTO(results[i]));
        }

        resolve(tasks);
      }
    );

    console.log(query.sql);
  });
};

//insert delete update
