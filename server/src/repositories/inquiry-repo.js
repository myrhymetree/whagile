const inquiryQuery = require('../database/inquiry-query');
// const InquiryDTO = require('../dto/inquiry/inquiry-response-dto');
// const InquiryHistoryDTO = require('../dto/inquiry/inquiry-history-response-dto');

/* 1:1 문의 등록 */
exports.insertInquiry = (connection, newInquiry) => {

    return new Promise((resolve, reject) => {
        connection.query(
            inquiryQuery.insertInquiry(),
            [
                newInquiry.title, 
                newInquiry.content,
                newInquiry.memberCode,
                newInquiry.categoryCode
            ],
            (err, results, fields) => {
                if(err) {
                    reject(err);
                }
                resolve(results);
            }
        );
    });
};

/* 1:1 문의 히스토리 생성 */
exports.insertInquiryHistory = (connection, newHistory) => {

    return new Promise((resolve, reject) => {
        connection.query(
            inquiryQuery.insertInquiryHistory(),
            [
                newHistory.historyContent,   
                newHistory.contentSnapshot.toString(),
                newHistory.inquiryCode,
                newHistory.memberCode
            ],
            (err, results, fields) => {
                if(err) {
                    reject(err);
                }
                resolve(results);
            }
        );
    });
};