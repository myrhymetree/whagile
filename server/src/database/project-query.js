/* 프로젝트 목록 조회 */

exports.selectProjects = (params) => {

    let query = 
      `
       SELECT
              A.*
            , (SELECT
                      COUNT(BK.BACKLOG_CODE)
                 FROM TBL_BACKLOG BK
                WHERE BK.BACKLOG_CATEGORY = '일감'
                  AND BK.BACKLOG_DELETED_YN = 'N'
                  AND BK.BACKLOG_PROGRESS_STATUS != '완료'
                  AND BK.PROJECT_CODE = B.PROJECT_CODE
                  AND BK.BACKLOG_CHARGER_CODE = ${ params.loginMember }
              ) TODO_TASK
            , (SELECT 
                      COUNT(BK.BACKLOG_CODE)
                 FROM TBL_BACKLOG BK
                WHERE BK.BACKLOG_CATEGORY = '일감'
                  AND BK.BACKLOG_DELETED_YN = 'N'
                  AND BK.PROJECT_CODE = B.PROJECT_CODE
                  AND BK.BACKLOG_CHARGER_CODE = ${ params.loginMember }
              ) TOTAL_TASK
            , (SELECT
                      M.MEMBER_NAME
                 FROM TBL_PROJECT_MEMBER PM
                 JOIN TBL_MEMBER M ON(PM.MEMBER_CODE = M.MEMBER_CODE)
                WHERE PM.PROJECT_CODE = B.PROJECT_CODE
                  AND PM.AUTHORITY_CODE = 1
              ) PROJECT_OWNER
         FROM TBL_PROJECT A
         JOIN TBL_PROJECT_MEMBER B ON (A.PROJECT_CODE = B.PROJECT_CODE)
         JOIN TBL_MEMBER C ON (B.MEMBER_CODE = C.MEMBER_CODE)
        WHERE A.PROJECT_DELETED_STATUS = 'N'
          AND C.MEMBER_CODE = ${ params.loginMember }
      `;

    if(params.searchValue !== undefined) {
       query += ` AND ${'A.PROJECT_NAME'} LIKE '%${params.searchValue}%'`;
    }

    query += `ORDER BY A.PROJECT_CODE DESC
              LIMIT ${params.offset}, ${params.limit} `;
    return query;
};

/* 프로젝트 추가 */
exports.insertProject = () => {
    return `
        INSERT
          INTO TBL_PROJECT
        (
          PROJECT_NAME
        , PROJECT_DESCRIPTION
        )
          VALUES
        (
          ?
        , ?
        )
    `;
}

exports.insertProjectMember = () => {
  return `
      INSERT
        INTO TBL_PROJECT_MEMBER
      (
        MEMBER_CODE
      , AUTHORITY_CODE
      , PROJECT_CODE
      )
        VALUES
      (
        ?
      , ?
      , ?
      )
  `;
}

/* 프로젝트 상세 조회 */
exports.selectProjectWithProjectCode = () => {
    return `
        SELECT
               A.PROJECT_CODE
             , A.PROJECT_NAME
             , A.PROJECT_DESCRIPTION
             , C.MEMBER_NAME
          FROM TBL_PROJECT A
          LEFT JOIN TBL_PROJECT_MEMBER B ON (A.PROJECT_CODE = B.PROJECT_CODE)
          LEFT JOIN TBL_MEMBER C ON (B.MEMBER_CODE = C.MEMBER_CODE)
         WHERE A.PROJECT_CODE = ?
           AND A.PROJECT_DELETED_STATUS = 'N'
           AND B.AUTHORITY_CODE = 1;
    `;
}

/* 프로젝트 수정 */
exports.updateProject = () => {
  return `
      UPDATE TBL_PROJECT A
         SET 
             A.PROJECT_NAME = ?
           , A.PROJECT_DESCRIPTION = ?
       WHERE A.PROJECT_CODE = ?
  `;
}

/* 기존 프로젝트 매니저 강등 */
exports.updateProjectOwner1 = () => {
  return `
     UPDATE 
            TBL_PROJECT_MEMBER A
        SET
            A.AUTHORITY_CODE = 2
      WHERE A.PROJECT_CODE = ?
        AND AUTHORITY_CODE = 1
  `;
}
/* 프로젝트 매니저 변경 */
exports.updateProjectOwner2 = () => {
  return `
    UPDATE TBL_PROJECT_MEMBER B
       SET
           B.AUTHORITY_CODE = 1
     WHERE B.PROJECT_CODE = ?
       AND B.MEMBER_CODE = ?
  `;
}

exports.deleteProject = () => {
  return `
    UPDATE TBL_PROJECT A
       SET
           A.PROJECT_DELETED_STATUS = 'Y'
     WHERE A.PROJECT_CODE = ?
  `;
}