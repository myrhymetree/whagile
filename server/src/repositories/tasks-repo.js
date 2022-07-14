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

    // console.log(query.sql);
  });
};


exports.selectTaskbyTaskCode = (connection, taskCode) => {
  return new Promise((resolve, reject) => {
    connection.query(
      tasksQuery.selectTaskbyTaskCode(),
      [parseInt(taskCode)],
      (err, results, fields) => {
        if (err) {
          reject(err);
        }

        const tasks = [];
        for (let i = 0; i < results.length; i++) {
          tasks.push(new TasksDTO(results[i]));
        }

        resolve(tasks);
      }
    );
  });
};


exports.insertNewTask = (connection, params) => {

    return new Promise((resolve, reject) => {
      console.log(params);
        connection.query(
          tasksQuery.insertNewTask(),
          [
            params.backlogTitle,
            params.backlogDiscription,
            params.progressStatus,
            params.urgency,
            params.backlogChargerCode,
            params.backlogCategory,
            params.sprintCode,
            params.projectCode,
            params.backlogCreatorCode,
            params.issue,
            params.backlogDeletedYN,
          ],
          (err, results, fields) => {
            if (err) {
              console.log(err);
              reject(err);
            }
            resolve(results);
          }
        );
    });
};



//delete update
