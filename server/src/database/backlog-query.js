/* 백로그 목록 조회 요청 SQL */

exports.selectBacklogs = (params) => {
<<<<<<< HEAD
  console.log("issue: ", params.issue);
  console.log("progressStatus: ", params.progressStatus);
  console.log("urgency: ", params.urgency);

=======
  
>>>>>>> da47f1827d974729b36b2e1bab8475e3513acda3
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
<<<<<<< HEAD

  if (!Number.isNaN(params.issue)) {
    console.log("issue가 숫자면 동작");
    query += `     AND A.BACKLOG_ISSUE = ${params.issue}
=======
  
  if(!Number.isNaN(params.issue)) {
    query += `     AND A.BACKLOG_ISSUE = ${ params.issue }
>>>>>>> da47f1827d974729b36b2e1bab8475e3513acda3
    `;
  }

  if (params.progressStatus !== undefined) {
    query += `     AND A.BACKLOG_PROGRESS_STATUS = '${params.progressStatus}'
    `;
<<<<<<< HEAD
    console.log("progressStatus가 undefined가 아니면 동작");
=======
>>>>>>> da47f1827d974729b36b2e1bab8475e3513acda3
  }

  if (params.urgency !== undefined) {
    query += `   AND A.BACKLOG_URGENCY = '${params.urgency}'
    `;
<<<<<<< HEAD
    console.log("urgency가 undefined가 아니면 동작");
=======
>>>>>>> da47f1827d974729b36b2e1bab8475e3513acda3
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