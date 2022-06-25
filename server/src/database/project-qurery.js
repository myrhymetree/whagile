exports.selectProjects = () => {

    return `
       SELECT
              A.*
         FROM TBL_PROJECT A
        ORDER BY A.PROJECT_CODE ASC
    `
}