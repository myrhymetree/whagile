const HttpStatus = require("http-status");
const TasksService = require("../services/tasks-service");


//전체 일감 목록 조회
exports.findAllTasks = async (req, res, next) => {
  // const projectCode = req.query.projectcode;
  // console.log("findAllTasks", req.query);
  const results = await TasksService.getTasks(req.query);

  // console.log("findAllTasks :", results);

  if (results && results.length > 0) {
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: "정상적으로 일감 목록을 조회했습니다.",
      results: results,
    });
  } else {
    res.status(HttpStatus.BAD_REQUEST).json({
      status: HttpStatus.BAD_REQUEST,
      message: "일감 목록 조회에 실패했습니다.",
    });
  }
};

// 개별 일감 조회
exports.findTaskByTaskCode = async (req, res, next) => { 
  console.log(req.params.taskCode) 
  const results = await TasksService.findTaskByTaskCode(
    req.params.taskCode
  );
  if (results && results.length > 0){
    res.status(HttpStatus.OK).json({
    status: HttpStatus.OK,
    message: "정상적으로 개별 일감을 조회했습니다.",
    results: results,
    })
  } else {
    res.status(HttpStatus.BAD_REQUEST).json({
      status: HttpStatus.BAD_REQUEST,
      message: "개별 일감 조회에 실패했습니다.",
    });
  }
};

// 개별 일감 생성
exports.registNewTask = async (req, res, next) => {
  console.log(111, req.body)
  await TasksService.registNewTask(req.body)
    .then((result) => {
      res.status(HttpStatus.CREATED).json({
        status: HttpStatus.CREATED,
        message: "정상적으로 일감을 생성했습니다.",
        results: result,
      });
    })
    .catch((err) => {
      res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        message: err,
      });
    });
};

// 개별 일감 수정
exports.editTask = async (req, res, next) => {
  console.log("INFO",req.body.kanbanInfo)
  await TasksService.editTask(req.body.kanbanInfo)
    .then((result) => {
      res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: "개별 일감 수정을 완료했습니다.",
        results: result,
      });
    })
    .catch((err) => {
      res.status(HttpStatus.BAD_REQUEST).json({
        status: HttpStatus.BAD_REQUEST,
        message: err,
      });
    });
};

// 개별 일감(백로그) 삭제

exports.removeTask = async (req, res, next) => {
  console.log("controllers", req.body)
  await TasksService.removeTask(req.body)
    .then((result) => {

      res.status(HttpStatus.OK).json({
          status: HttpStatus.OK,
          message: '개별 일감 삭제를 완료했습니다.',
          results: result
      });
    })
};


// 일감(백로그) 히스토리 조회 요청
exports.findAllTaskHistory = async (req, res, next) =>{

    await TasksService.findAllTaskHistory (req.body)
    .then((result) => {
        res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            message: "일감 히스토리를 정상적으로 조회했습니다.",
            results: result,
        });

    })
    .catch((err) =>{
            res.status(HttpStatus.BAD_REQUEST).json({
                status: HttpStatus.BAD_REQUEST,
                message: err
            });
        });
}

// 진행중인 스프린트의 일감 조회
exports.findTasksOnGoingSprint = async (req, res, next) =>{

    await TasksService.findTasksOnGoingSprint(req.query)
    .then((result) => {
        res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            message: "진행중인 스프린트의 일감을 정상적으로 조회했습니다.",
            results: result,
        });

    })
    .catch((err) =>{
            res.status(HttpStatus.BAD_REQUEST).json({
                status: HttpStatus.BAD_REQUEST,
                message: err
            });
        });
}

exports.findSprint = async (req, res, next) =>{
    console.log(1212,req.query)
    await TasksService.findSprint(req.query)
    .then((result) => {
        res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            message: "진행중인 스프린트의 일감을 정상적으로 조회했습니다.",
            results: result,
        });

    })
    .catch((err) =>{
            res.status(HttpStatus.BAD_REQUEST).json({
                status: HttpStatus.BAD_REQUEST,
                message: err
            });
        });
}

