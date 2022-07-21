const express = require('express');
const router = express.Router();
const InquiryController = require('../controllers/inquiry-controller');

/* 1:1 문의 등록 */
router.post('/', InquiryController.registInquiry);

/* 1:1 문의 목록 조회 */
// router.get('/', InquiryController.findInquiries);

/* 1:1 문의 수 조회 */

/* 1:1 문의 상세 조회 */

/* 1:1 문의 수정 */

/* 1:1 문의 삭제 */

module.exports = router;