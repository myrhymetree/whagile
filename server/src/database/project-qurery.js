exports.selectProjects = () => {

    return `
       SELECT
              A.*
         FROM TBL_PROJECT A
        WHERE A.PROJECT_DELETED_STATUS = 'N'
        ORDER BY A.PROJECT_CODE ASC
    `
}

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

exports.selectProjectWithProjectCode = () => {
    return `
        SELECT
               A.PROJECT_CODE
             , A.PROJECT_NAME
             , A.PROJECT_DESCRIPTION
             , C.MEMBER_NAME
          FROM TBL_PROJECT A
          JOIN TBL_PROJECT_HISTORY B ON (A.PROJECT_CODE = B.PROJECT_CODE)
          JOIN TBL_MEMBER C ON (B.MEMBER_CODE = C.MEMBER_CODE)
         WHERE A.PROJECT_CODE = ?
           AND A.PROJECT_DELETED_STATUS = 'N'
    `;
}

exports.updateProject = () => {
  return `
      UPDATE TBL_PROJECT A
         SET 
             A.PROJECT_NAME = ?
           , A.PROJECT_DESCRIPTION = ?
           , A.PROJECT_DELETED_STATUS = ?
  `;
}