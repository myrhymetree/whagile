/* 1:1 문의 행 삽입 요청 SQL*/
exports.insertInquiry = () => {

    return `
        INSERT INTO TBL_INQUIRY 
        (INQUIRY_CREATED_DATE, INQUIRY_TITLE, INQUIRY_CONTENT, MEMBER_CODE, INQUIRY_CATEGORY_CODE)
        VALUES
        (DATE_FORMAT(NOW(), '%Y-%m-%d %H:%i:%s'), ?, ?, ?, ?)
    `;
}

/* 1:1 문의히스토리 행 삽입 요청 SQL */
exports.insertInquiryHistory = () => {

    return `
        INSERT INTO TBL_INQUIRY_HISTORY
        (INQUIRY_HISTORY_DATE, INQUIRY_HISTORY_CONTENT, INQUIRY_CONTENT_SNAPSHOT, INQUIRY_CODE, MEMBER_CODE)
        VALUES
        (DATE_FORMAT(NOW(), '%Y-%m-%d %H:%i:%s'), ?, ?, ?, ?)
    `;
}