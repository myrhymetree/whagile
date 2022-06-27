const httpStatus = require('http-status');
const HttpStatus = require('http-status');
const BacklogService = require('../services/backlog-service');

/* 백로그 목록 조회 요청 */
exports.findAllBacklogs = async (req, res, next) => {

    /* querystring parameter로 넘어온 페이징 조건 및 필터링 조건을 추출 */
    console.log(req.query.offset);
    console.log(req.query.limit);
    console.log(req.query.issue);
    console.log(req.query.progressStatus);
    console.log(req.query.urgency);

    const params = {
        offset: Number(req.query.offset),
        limit: Number(req.query.limit),
        issue: Number(req.query.issue),
        progressStatus: req.query.progressStatus,
        urgency: req.query.urgency
    };

    console.log(typeof(params.offset));
    console.log(typeof(params.limit));
    console.log(typeof(params.issue));

    const results = await BacklogService.findBacklogs(params);
    
    console.log('컨트롤러에서 확인 ', results);

    res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: '정상적으로 백로그 목록을 조회했습니다.',
        results: results
    });
};

/* 새로운 백로그 생성 요청 */
exports.registNewBacklog = async (req, res, next) => {

    const backlog = {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        progressStatus: req.body.progressStatus,
        urgency: req.body.urgency,
        issue: req.body.issue,
        projectCode: req.body.projectCode,
        creatorCode:  req.body.creatorCode
    };
    console.log('backlog : ', backlog);

    const results = await BacklogService.registNewBacklog(backlog);
    
    res.status(httpStatus.CREATED).json({
        status: httpStatus.CREATED,
        message: '백로그가 생성되었습니다.',
        results: results,
        url: 'localhost:8888/api/backlogs?offset=0&limit=10'
    });
};