/* 백로그 목록 조회 요청 SQL */

exports.selectBacklogs = (params) => {
  let query = `
    SELECT 
           A.BACKLOG_CODE
         , A.BACKLOG_TITLE
         , A.BACKLOG_CATEGORY
         , A.BACKLOG_PROGRESS_STATUS
         , A.BACKLOG_URGENCY
         , A.BACKLOG_ISSUE
         , A.PROJECT_CODE
         , A.BACKLOG_CREATOR_CODE
         , C.MEMBER_NAME
      FROM TBL_BACKLOG A
      JOIN TBL_PROJECT_MEMBER B ON (A.PROJECT_CODE = B.PROJECT_CODE) AND (A.BACKLOG_CREATOR_CODE = B.MEMBER_CODE)
      JOIN TBL_MEMBER C ON (B.MEMBER_CODE = C.MEMBER_CODE)
     WHERE A.BACKLOG_DELETED_YN = 'N'
       AND A.BACKLOG_CATEGORY = '백로그'
  `;

  if (!Number.isNaN(params.issue)) {
    query += `     AND A.BACKLOG_ISSUE = ${params.issue}
    `;
  }

  if (params.progressStatus !== undefined) {
    query += `     AND A.BACKLOG_PROGRESS_STATUS = '${params.progressStatus}'
    `;
  }

  if (params.urgency !== undefined) {
    query += `   AND A.BACKLOG_URGENCY = '${params.urgency}'
    `;
  }

  query += ` ORDER BY A.BACKLOG_CODE DESC
     LIMIT ${params.offset}, ${params.limit}`;

  return query;
};

/* 백로그 상세조회 요청 SQL */
exports.selectBacklogByBacklogCode = () => {
  return `
    SELECT
            A.BACKLOG_CODE
          , A.BACKLOG_TITLE
          , A.BACKLOG_DESCRIPTION
          , A.BACKLOG_PROGRESS_STATUS
          , A.BACKLOG_URGENCY
          , A.BACKLOG_CATEGORY
          , A.PROJECT_CODE
          , A.BACKLOG_ISSUE
          , A.BACKLOG_CREATOR_CODE
          , C.MEMBER_NAME
      FROM TBL_BACKLOG A
      JOIN TBL_PROJECT_MEMBER B ON (A.PROJECT_CODE = B.PROJECT_CODE) AND (A.BACKLOG_CREATOR_CODE = B.MEMBER_CODE)
      JOIN TBL_MEMBER C ON (B.MEMBER_CODE = C.MEMBER_CODE)
      WHERE A.BACKLOG_CODE = ?
      ORDER BY A.BACKLOG_CODE DESC
  `;
};

/* 백로그 행 삽입 요청 SQL */
exports.insertNewBacklog = () => {
  return `
    INSERT INTO TBL_BACKLOG
    (BACKLOG_TITLE, BACKLOG_DESCRIPTION, BACKLOG_CATEGORY, BACKLOG_PROGRESS_STATUS, 
      BACKLOG_URGENCY, BACKLOG_ISSUE, PROJECT_CODE, BACKLOG_CREATOR_CODE)
    VALUES
    (?, ?, ?, ?, ?, ?, ?, ?)
  `;
};

/* 백로그 히스토리 행 삽입 요청 SQL */
exports.insertBacklogHistory = () => {

  return `
    INSERT INTO TBL_BACKLOG_HISTORY
    (BACKLOG_HISTORY_ITEM, BACKLOG_HISTORY_CONTENT, BACKLOG_HISTORY_DATE, BACKLOG_CODE, PROJECT_CODE, MEMBER_CODE)
    VALUES
    (?, ?, ?, ?, ?, ?)
  `;
};

/* 백로그 히스토리 1개 행 조회 요청 SQL */
exports.selectHistoryByHistoryCode = () => {

  return `
    SELECT
           A.BACKLOG_HISTORY_CODE
         , A.BACKLOG_HISTORY_ITEM
         , A.BACKLOG_HISTORY_CONTENT
         , A.BACKLOG_HISTORY_DATE
         , A.BACKLOG_CODE
         , A.PROJECT_CODE
         , A.MEMBER_CODE
      FROM TBL_BACKLOG_HISTORY A
     WHERE A.BACKLOG_HISTORY_CODE = ?
  `;
};

/* 백로그 수정 요청 SQL */
exports.editBacklog = (modifyingContent) => {

  console.log(`query로 넘어온 modifyingContent: `);
  console.log(modifyingContent.changedCategory);
  console.log(modifyingContent.changedValue);

  let query = `
    UPDATE TBL_BACKLOG A
  `;

  switch(modifyingContent.changedCategory) {
    case 'title' : 
      query += `  SET A.BACKLOG_TITLE = '${ modifyingContent.changedValue }'
      `;
      break;
    case 'description' : 
      query += `  SET A.BACKLOG_DESCRIPTION = '${ modifyingContent.changedValue }'
      `;
      break;
    case 'category' :
      query += `  SET A.BACKLOG_CATEGORY = '${ modifyingContent.changedValue }'
      `;
      break;
    case 'progressStatus' : 
      query += `  SET A.BACKLOG_PROGRESS_STATUS = '${ modifyingContent.changedValue }'
      `;
      break;
    case 'urgency' : 
      query += `  SET A.BACKLOG_URGENCY = '${ modifyingContent.changedValue }'
      `;
      break;
    case 'issue' : 
      query += `  SET A.BACKLOG_ISSUE = '${ Number(modifyingContent.changedValue) }'
      `;
      break;
  }

  query += ` WHERE A.BACKLOG_CODE = ${ modifyingContent.backlogCode }`;

  return query;
};