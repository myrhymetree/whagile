const HttpStatus = require("http-status");
const TasksService = require("../services/tasks-service");

//전체 일감 목록 조회
exports.findAllTasks = async (req, res, next) => {
  const params = {
    offset: Number(req.query.offset),
    limit: Number(req.query.limit),
    issue: Number(req.query.issue),
    progressStatus: req.query.progressStatus,
    urgency: req.query.urgency,
    sprintCode: Number(req.query.sprintCode),
    category: req.query.category
  };
  console.log(params);
  const results = await TasksService.getTasks(params);

  if (results && results.length > 0) {
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: "정상적으로 일감 목록을 조회했습니다.",
      data: results,
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
  console.log(req.params.taskCode);
  const results = await TasksService.findTaskByTaskCode(req.params.taskCode);
  if (results && results.length > 0) {
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: "정상적으로 개별 일감을 조회했습니다.",
      data: results,
    });
  } else {
    res.status(HttpStatus.BAD_REQUEST).json({
      status: HttpStatus.BAD_REQUEST,
      message: "개별 일감 조회에 실패했습니다.",
    });
  }
};

// 개별 일감 생성
exports.registNewTask = async (req, res, next) => {
  // console.log(req.body)
    await TasksService.registNewTask(req.body);
    const results = req.body
        res.status(HttpStatus.CREATED).json({
          status: HttpStatus.CREATED,
          message: "정상적으로 일감을 생성했습니다.",
          data: results,
        });
};


// 개별 일감 수정
exports.editTask = async (req, res, next) => {
    await TasksService.editTask(req.body);
    const results = req.body
    res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      message: "개별 일감 수정을 완료했습니다.",
      data: results,
    });
};
