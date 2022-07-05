const HttpStatus = require("http-status");
const TasksService = require("../services/tasks-service");

exports.findAllTasks = async (req, res, next) => {
  const params = {
    offset: Number(req.query.offset),
    limit: Number(req.query.limit),
    issue: Number(req.query.issue),
    progressStatus: req.query.progressStatus,
    urgency: req.query.urgency,
    backlogChargerCode: Number(req.query.backlogChargerCode),
  };

  const results = await TasksService.getTasks(params);

  console.log("findAllTasks :", results);

  if (results && results.length > 0) {
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: "정상적으로 일감 목록을 조회했습니다.",
      results: results,
    });
  } else {
    res.status(HttpStatus.BAD_REQUEST).json({
      status: HttpStatus.BAD_REQUEST,
      message: err,
    });
  }
};


exports.findTaskByTaskCode = async (req, res, next) => { 
  console.log(req.params.taskCode) 
  const results = await TasksService.findTaskByTaskCode(
    req.params.taskCode
  );

      res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: "정상적으로 개별 일감을 조회했습니다.",
      results: results,
    });
};


exports.registNewTask = async (req, res, next) => {
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