const HttpStatus = require('http-status');
const InquiryService = require('../services/inquiry-service');
const { decodedToken } = require('../util/account-utils');

/* 토큰에서 사용자 정보 꺼내기 */
getUserInfo = (accessToken) => {
    
   return decodedToken(accessToken);
}

/* 1:1 문의 등록 */
exports.registInquiry = async (req, res, next) => {

    const user = getUserInfo(req.get('Access-Token'));

    const newInquiry = {
        title: req.body.title,
        content: req.body.content,
        memberCode: user.usercode,
        categoryCode: req.body.categoryCode
    }
    console.log('regist inquiry...', user)

    const results = await InquiryService.registInquiry(newInquiry);

    try {
        res.status(HttpStatus.OK).json({
            status: HttpStatus.CREATED,
            message: '문의 글이 등록되었습니다.',
            results: results
        });
    } catch(err) {
        res.status(HttpStatus.BAD_REQUEST).json({
            status: HttpStatus.BAD_REQUEST,
            message: err,
        });
    }
};

/* 1:1 문의 목록 조회 */

/* 답변 대기 중인 1:1 문의 수 조회 */

/* 1:1 문의 상세 조회 */

/* 1:1 문의 수정 */

/* 1:1 문의 삭제 */