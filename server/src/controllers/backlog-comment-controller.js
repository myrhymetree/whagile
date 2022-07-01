const HttpStatus = require('http-status');
const BacklogCommentService = require('../services/backlog-comment-service');

/* 백로그 댓글 조회 요청 */
exports.findBacklogComments = async (req, res, next) => {

    const params = {
        backlogCode: Number(req.params.backlogCode),
        offset: Number(req.query.offset),
        limit: Number(req.query.limit)
    };

    const results = await BacklogCommentService.findBacklogComments(params);

    res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: '댓글 조회에 성공했습니다.',
        results: results
    });
};