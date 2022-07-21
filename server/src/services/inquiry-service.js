const getConnection = require('../database/connection');
const InquiryRepository = require('../repositories/inquiry-repo');

/* 히스토리 발생 항목 */
const INSERT = '게시물 등록';
const UPDATE_TITLE = '게시물 제목 수정';
const UPDATE_CONTENT = '게시물 내용 수정';
const UPDATE_CATEGORY = '게시물 카테고리 수정';
const DELETE = '게시물 삭제';

/* 히스토리 생성 함수 */
createNewHistory = () => {

    return {
        historyContent: null,
        contentSnapshot: [],
        inquiryCode: null,
        memberCode: null
    };
};

/* 1:1 문의 등록 */
exports.registInquiry = (newInquiry) => {

    return new Promise(async (resolve, reject) => {
        const connection = getConnection();
        connection.beginTransaction();

        try {
            /* 1:1 문의 데이터 삽입 */
            const result = await InquiryRepository.insertInquiry(connection, newInquiry);

            /* 1:1 문의 히스토리 데이터 생성 */
            const newHistory = createNewHistory();
            
            newHistory.historyContent = INSERT;   
            newHistory.inquiryCode = result.insertId;
            newHistory.memberCode = newInquiry.memberCode;

            newHistory.contentSnapshot = [];
            newHistory.contentSnapshot.push(newInquiry.title);
            newHistory.contentSnapshot.push(newInquiry.content);
            newHistory.contentSnapshot.push(newInquiry.categoryCode);

            /* 1:1 문의 히스토리 데이터 삽입 */
            await InquiryRepository.insertInquiryHistory(connection, newHistory);

            connection.commit();

            resolve(result);

        } catch(err) {

            connection.rollback();

            reject(err);
        } finally {

            connection.end();
        }
    });
}

/* 1:1 문의 목록 조회 */
exports.findInquiries = (params) => {

    return new Promise(async (resolve, reject) => {

        const connection = getConnection();

        const results = await InquiryRepository.selectInquiries(connection, params);

        connection.end();

        resolve(results);
    });
}

/* 1:1 문의 상세 조회 */
exports.findInquiryByInquiryCode = (inquiryCode) => {

    return new Promise(async (resolve, reject) => {

        const connection = getConnection();

        const results = await InquiryRepository.selectInquiry(connection, inquiryCode);

        connection.end();

        resolve(results);
    });
};