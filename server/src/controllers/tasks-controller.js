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
