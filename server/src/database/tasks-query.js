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
        AND BACKLOG_CATEGORY = '일감'
        ORDER BY BACKLOG_CODE ASC
    `;

  // if (!Number.isNaN(params.issue)) {
  //   query += `     AND A.BACKLOG_ISSUE = ${params.issue}
  //   `;
  // }

  // if (params.progressStatus !== undefined) {
  //   query += `     AND A.BACKLOG_PROGRESS_STATUS = '${params.progressStatus}'
  //   `;
  // }

  // if (params.progressStatus === '진행 전') {
  //   query += `     AND A.BACKLOG_PROGRESS_STATUS = '${params.progressStatus}'
  // `;
  // }
  
  // if (params.progressStatus === '진행 중') {
  //   query += `     AND A.BACKLOG_PROGRESS_STATUS = '${params.progressStatus}'
  // `;
  // }
    
  // if (params.progressStatus === '완료') {
  //     query += `     AND A.BACKLOG_PROGRESS_STATUS = '${params.progressStatus}'
  // `;
  //   }

  // if (params.urgency !== undefined) {
  //   query += `   AND A.BACKLOG_URGENCY = '${params.urgency}'
  //   `;
  // }

  // query += ` ORDER BY A.BACKLOG_CODE DESC
  //    LIMIT ${params.offset}, ${params.limit}`;

  return query;
};

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
        AND BACKLOG_CATEGORY = '일감'
        ORDER BY BACKLOG_CODE ASC
    `;
  return query;
};

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
      , BACKLOG_DELETED_YN
      ) 
        VALUES 
      (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
