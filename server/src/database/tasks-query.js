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

  return query;
};


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
}



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
