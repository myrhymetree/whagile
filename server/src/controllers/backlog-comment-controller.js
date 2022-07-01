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

/* 백로그 댓글 생성 요청 */
exports.registComment = async (req, res, next) => {

    const newComment = {
        content: req.body.content,
        createdDate: req.body.createdDate,
        backlogCode: Number(req.body.backlogCode),
        projectCode: Number(req.body.projectCode),
        memberCode: Number(req.body.memberCode)
    };
    console.log('newComment: ', newComment);

    const results = await BacklogCommentService.registComment(newComment);

    res.status(HttpStatus.CREATED).json({
        status: HttpStatus.CREATED,
        message: '댓글 추가에 성공했습니다.',
        results: results,
        url: 'localhost:8888/api/backlog-comments/:backlogCode?offset=0&limit=5'
    });
};

/* 백로그 댓글 수정 요청 */
exports.editComment = async (req, res, next) => {

    const modifyingContent = {
        backlogCommentCode: Number(req.body.backlogCommentCode),
        content: req.body.content,
        modifiedDate: req.body.modifiedDate,
        projectCode : Number(req.body.projectCode),
        memberCode: Number(req.body.memberCode)
    };

    const results = await BacklogCommentService.editComment(modifyingContent);

    res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        message: '댓글 수정에 성공했습니다.',
        results: results
    });
};