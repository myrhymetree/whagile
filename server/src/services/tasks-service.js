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

				// const taskHistory = createTaskHistory();

        // taskHistory.historyContent = "일감 생성";
        // taskHistory.taskCode = params.taskCode;
        // taskHistory.projectCode = params.projectCode;
        // taskHistory.memberCode = params.memberCode;
        // await TasksRepository.insertTaskHistory(connection, taskHistory);
      
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

			// const taskHistory = createTaskHistory();
			// taskHistory.historyContent = "일감 수정";
			// taskHistory.taskCode = params.taskCode;
			// taskHistory.projectCode = params.projectCode;
			// taskHistory.memberCode = params.memberCode;
			// await TasksRepository.insertTaskHistory(connection, taskHistory);

			// const taskHistoryInserted = await TasksRepository.insertTaskHistory(
			// 		connection,
			// 		taskHistory
			// );

			// await TasksRepository.selectTaskbyTaskCode(
			// 		connection,
			// 		taskHistoryInserted.insertedCode
			// );

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



// 삭제 
exports.removeTask = (taskCode, progressStatus, projectCode, memberCode) => {
  return new Promise(async (resolve, reject) => {
    const connection = getConnection();
    connection.beginTransaction();

    try {
      if (progressStatus === "백로그") {
        await TasksRepository.deleteTask(connection, taskCode);

        const removedTask = await TasksRepository.selectTaskbyTaskCode(
          connection,
          taskCode
        );

        // const taskHistory = createTaskHistory();

        // taskHistory.historyContent = "삭제";
        // taskHistory.taskCode = taskCode;
        // taskHistory.projectCode = projectCode;
        // taskHistory.memberCode = memberCode;

        // const taskHistoryInserted = await TasksRepository.insertTaskHistory(connection, taskHistory)

        // await TasksRepository.selectTaskbyTaskCode(connection, taskHistoryInserted.insertedCode)

        connection.commit();
        resolve(removedTask);

      } else {

        await TasksRepository.removeTask(connection, taskCode);

        const removedTask = await TasksRepository.selectTaskbyTaskCode(
          connection,
          taskCode
        );
        // const taskHistory = createTaskHistory();

        // taskHistory.historyContent = "일감 삭제(백로그 상태 변경)";
        // taskHistory.taskCode = taskCode;
        // taskHistory.projectCode = projectCode;
        // taskHistory.memberCode = memberCode;

        // const taskHistoryInserted = await TasksRepository.insertTaskHistory(
        //   connection,
        //   taskHistory
        // );

        // await TasksRepository.selectTaskbyTaskCode(
        //   connection,
        //   taskHistoryInserted.insertedCode
        // );

        connection.commit();
        resolve(removedTask);

        connection.commit();
        resolve(removedTask);
      }
    } catch (err) {
      connection.rollback();

      reject(err);
    } finally {
      connection.end();
    }
  });
};



// 일감 히스토리 생성
createTaskHistory = () => {
    
    const taskHistory = {
        historyItem: '',    
        historyContent: '',  
        historyDate: '',  
        taskCode: 0,   
        projectCode: 0,   
        memberCode: 0
    };
    
    /* 히스토리 발생일 정보 생성 */
    const insertDate = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString();

    taskHistory.historyDate = insertDate;

    return taskHistory;
};





// 일감(백로그) 히스토리 조회

exports.findAllTaskHistory = (params) => {
  return new Promise((resolve, reject) => {
    const connection = getConnection();

    const results = TasksRepository.selectTaskHistories(connection, params);

    connection.end();

    resolve(results);
  });
};
