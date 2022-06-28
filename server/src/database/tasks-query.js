const { query } = require("express");

exports.selectTasks = (params) => {
  let query = `
       SELECT
              A.BACKLOG_CODE
            , A.BACKLOG_TITLE
            , A.BACKLOG_CHARGER_CODE
            , A.BACKLOG_CATEGORY
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

  if (!Number.isNaN(params.issue)) {
    // 이슈
    query += `     AND A.BACKLOG_ISSUE = ${params.issue}
    `;
  }

  if (params.urgency !== undefined) {
    // 긴급도
    query += `   AND A.BACKLOG_URGENCY = '${params.urgency}'
    `;
  }

  if (params.progressStatus !== undefined) {
    // 진행상태
    query += `     AND A.BACKLOG_PROGRESS_STATUS = '${params.progressStatus}'
    `;
  }

  // offset, limit
  // query += ` ORDER BY A.BACKLOG_CODE DESC
  //    LIMIT ${params.offset}, ${params.limit}`;

  return query;
};
