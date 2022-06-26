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

exports.selectProjectWithProjectCode = () => {
    return `
        SELECT
               A.PROJECT_CODE
             , A.PROJECT_NAME
             , A.PROJECT_DESCRIPTION
          FROM TBL_PROJECT A
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