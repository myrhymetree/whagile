const { urlencoded } = require('express');
const HttpStatus = require('http-status');
const BacklogService = require('../services/backlog-service');

/* 백로그 목록 조회 요청 */
exports.findAllBacklogs = async (req, res, next) => {

    /* querystring parameter로 넘어온 페이징 조건 및 필터링 조건을 추출 */
    console.log(req.query.offset);
    console.log(req.query.limit);
    console.log(req.query.issue);
    console.log(req.query.progressStatus);
    console.log(req.query.uegency);

    const params = {
        offset: Number(req.query.offset),
        limit: Number(req.query.limit),
        issue: Number(req.query.issue),
        progressStatus: req.query.progressStatus,
        urgency: req.query.uegency
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