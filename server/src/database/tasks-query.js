
// 전체 일감 목록 조회
exports.selectTasks = (params) => {
  console.log("progressStatus: ", params.progressStatus);
  let query = `
       SELECT
              A.BACKLOG_CODE
            , A.BACKLOG_TITLE
            , A.BACKLOG_CHARGER_CODE
            , A.BACKLOG_CATEGORY
            , A.BACKLOG_DESCRIPTION
            , A.BACKLOG_PROGRESS_STATUS
            , A.BACKLOG_URGENCY
            , A.BACKLOG_ISSUE  
            , A.PROJECT_CODE
            , A.BACKLOG_CREATOR_CODE
            , A.SPRINT_CODE
            , A.BACKLOG_CREATOR_CODE
            , E.MEMBER_NAME
         FROM TBL_BACKLOG A
         JOIN TBL_SPRINT B ON (A.SPRINT_CODE = B.SPRINT_CODE)
         JOIN TBL_PROJECT C ON (A.PROJECT_CODE = C.PROJECT_CODE)
         JOIN TBL_PROJECT_MEMBER D ON (A.PROJECT_CODE = D.PROJECT_CODE) AND (A.BACKLOG_CREATOR_CODE = D.MEMBER_CODE)
         JOIN TBL_MEMBER E ON (D.MEMBER_CODE = E.MEMBER_CODE)
        WHERE BACKLOG_DELETED_YN = 'N'
        ORDER BY BACKLOG_CODE ASC
    `;

  return query;
};

// AND BACKLOG_CATEGORY = '일감'



// 개별 일감 조회
exports.selectTaskbyTaskCode = () => {
  let query = `
       SELECT
              A.BACKLOG_CODE
            , A.BACKLOG_TITLE
            , A.BACKLOG_CHARGER_CODE
            , A.BACKLOG_CATEGORY
            , A.BACKLOG_DESCRIPTION
            , A.BACKLOG_PROGRESS_STATUS
            , A.BACKLOG_URGENCY
            , A.BACKLOG_ISSUE  
            , A.PROJECT_CODE
            , A.BACKLOG_CREATOR_CODE
            , A.SPRINT_CODE
            , A.BACKLOG_CREATOR_CODE
            , E.MEMBER_NAME
         FROM TBL_BACKLOG A
         JOIN TBL_SPRINT B ON (A.SPRINT_CODE = B.SPRINT_CODE)
         JOIN TBL_PROJECT C ON (A.PROJECT_CODE = C.PROJECT_CODE)
         JOIN TBL_PROJECT_MEMBER D ON (A.PROJECT_CODE = D.PROJECT_CODE) AND (A.BACKLOG_CREATOR_CODE = D.MEMBER_CODE)
         JOIN TBL_MEMBER E ON (D.MEMBER_CODE = E.MEMBER_CODE)
        WHERE BACKLOG_DELETED_YN = 'N'
        AND A.BACKLOG_CODE = ?
        ORDER BY BACKLOG_CODE ASC
    `;
  return query;
}

// exports.selectTaskbyTaskCode = () => {
//   return `
//     SELECT
//            A.BACKLOG_CODE
//          , A.BACKLOG_TITLE
//          , A.BACKLOG_DESCRIPTION
//          , A.BACKLOG_PROGRESS_STATUS
//          , A.BACKLOG_URGENCY
//          , A.BACKLOG_CATEGORY
//          , A.PROJECT_CODE
//          , IFNULL(A.SPRINT_CODE, 0) AS SPRINT_CODE
//          , IFNULL(C.SPRINT_NAME, '') AS SPRINT_NAME
//          , A.BACKLOG_ISSUE
//          , A.BACKLOG_CREATOR_CODE
//          , (SELECT MEMBER_NAME FROM TBL_MEMBER WHERE MEMBER_CODE = A.BACKLOG_CREATOR_CODE) AS CREATOR_NAME
//          , IFNULL(A.BACKLOG_CHARGER_CODE, 0) AS CHARGER_CODE
//          , IFNULL((SELECT MEMBER_NAME FROM TBL_MEMBER WHERE MEMBER_CODE = A.BACKLOG_CHARGER_CODE), '') AS CHARGER_NAME
//          , A.BACKLOG_DELETED_YN
//       FROM TBL_BACKLOG A
//       JOIN TBL_PROJECT_MEMBER B ON (A.PROJECT_CODE = B.PROJECT_CODE) AND (A.BACKLOG_CREATOR_CODE = B.MEMBER_CODE)
//       LEFT JOIN TBL_SPRINT C ON (A.SPRINT_CODE = C.SPRINT_CODE)
//       JOIN TBL_MEMBER D ON (B.MEMBER_CODE = D.MEMBER_CODE)
//      WHERE A.BACKLOG_CODE = ?
//   `;
// };

// 개별 일감 생성
exports.insertNewTask = () => {
  return `
      INSERT INTO TBL_BACKLOG 
      (
        BACKLOG_TITLE
      , BACKLOG_DESCRIPTION
      , BACKLOG_PROGRESS_STATUS
      , BACKLOG_URGENCY
      , BACKLOG_CHARGER_CODE
      , BACKLOG_CATEGORY
      , SPRINT_CODE
      , PROJECT_CODE
      , BACKLOG_CREATOR_CODE
      , BACKLOG_ISSUE
      ) 
        VALUES 
      (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
};



// 개별 일감 수정
exports.updateTask = () => {
  return `
        UPDATE TBL_BACKLOG
        SET
              BACKLOG_TITLE = ?
            , BACKLOG_DESCRIPTION = ?
            , BACKLOG_PROGRESS_STATUS = ?
            , BACKLOG_URGENCY = ?
            , BACKLOG_CHARGER_CODE = ?
            , BACKLOG_ISSUE = ?
        WHERE
            BACKLOG_CODE = ?
    `;
};


// 개별 백로그(일감) 삭제
exports.deleteTask = () => {
  return `
      UPDATE TBL_BACKLOG A
         SET A.BACKLOG_DELETED_YN = 'Y'
       WHERE A.BACKLOG_CODE = ?
  `;
};

