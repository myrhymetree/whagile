exports.insertSprint = () => {

    let query = `
        INSERT INTO TBL_SPRINT (
              SPRINT_NAME
            , SPRINT_TARGET
            , SPRINT_START_DATE
            , SPRINT_END_DATE
            , SPRINT_PROGRESS_STATUS
            , SPRINT_DELETED_YN
            , PROJECT_CODE
        ) VALUES (
              ?
            , ?
            , ?
            , ?
            , 'N'
            , 'N'
            , ?
        )
    `;

    return query;
}

exports.selectSprints = (params) => {

    let query = `
        SELECT 
            SPRINT_CODE
            , SPRINT_NAME
            , SPRINT_TARGET
            , SPRINT_START_DATE
            , SPRINT_END_DATE
            , SPRINT_PROGRESS_STATUS
            , PROJECT_CODE
        FROM TBL_SPRINT
        WHERE 
            SPRINT_DELETED_YN = 'N'
            AND PROJECT_CODE = ?
    `;

    if((   params.searchCondition === 'name'
        || params.searchCondition === 'target' 
        || params.searchCondition === 'progress_status') 
        && params.searchValue !== undefined) { // 조건 검색
        query += `AND ${'SPRINT_' + params.searchCondition.toUpperCase()} LIKE '%${params.searchValue}%'`;
    }
    
    if((   params.orderCondition === 'code' 
        || params.orderCondition === 'name' 
        || params.orderCondition === 'start_date' 
        || params.orderCondition === 'end_date') 
        &&(params.orderValue.toLowerCase() === 'asc'
        || params.orderValue.toLowerCase() === 'desc')) { // 정렬
        query += `\nORDER BY ${'SPRINT_' + params.orderCondition.toUpperCase()} ${params.orderValue.toUpperCase()}`;
    }
    
    if(params.offset !== undefined && params.limit !== undefined) { // 페이징
        query += `\nLIMIT ${params.offset}, ${params.limit}`;
    }

    return query;
}

exports.selectSprintHistory = (params) => {
    console.log('selectSprintHistory', params);
    let query = `
        SELECT 
            SPRINT_HISTORY_CODE
            , SPRINT_HISTORY_ITEM
            , SPRINT_HISTORY_CONTENT
            , SPRINT_HISTORY_DATE
            , SPRINT_CODE
            , MEMBER_CODE
            , PROJECT_CODE
        FROM TBL_SPRINT_HISTORY
        WHERE 1 = 1
    `;

    if(params.sprintCode !== undefined) {
        query += `AND SPRINT_CODE = ${params.sprintCode}`;
    }

    if(params.projectCode !== undefined) {
        query += `AND PROJECT_CODE = ${params.projectCode}`;
    }

    if((   params.searchCondition === 'item'
        || params.searchCondition === 'content') 
        && params.searchValue !== undefined) { // 조건 검색
        query += `AND ${'SPRINT_HISTORY_' + params.searchCondition.toUpperCase()} LIKE '%${params.searchValue}%'`;
    }

    if((   params.orderCondition === 'code' 
        || params.orderCondition === 'item' 
        || params.orderCondition === 'date') 
        &&(params.orderValue.toLowerCase() === 'asc'
        || params.orderValue.toLowerCase() === 'desc')) { // 정렬
        query += `\nORDER BY ${'SPRINT_HISTORY_' + params.orderCondition.toUpperCase()} ${params.orderValue.toUpperCase()}`;
    }

    if(params.offset !== undefined && params.limit !== undefined) { // 페이징
        query += `\nLIMIT ${params.offset}, ${params.limit}`;
    }

    return query;
}

exports.selectSprint = () => {

    let query = `
        SELECT 
              SPRINT_CODE
            , SPRINT_NAME
            , SPRINT_TARGET
            , SPRINT_START_DATE
            , SPRINT_END_DATE
            , SPRINT_PROGRESS_STATUS
            , PROJECT_CODE
        FROM TBL_SPRINT
        WHERE 
            SPRINT_DELETED_YN = 'N'
            AND SPRINT_CODE = ?
    `;

    return query;
}

exports.updateSprint = () => {

    let query = `
        UPDATE TBL_SPRINT
        SET
              SPRINT_NAME = ?
            , SPRINT_TARGET = ?
            , SPRINT_START_DATE = ?
            , SPRINT_END_DATE = ?
            , SPRINT_PROGRESS_STATUS = ?
        WHERE
            SPRINT_CODE = ?
    `;

    return query;
}

exports.deleteSprint = () => {

    let query = `
        UPDATE TBL_SPRINT
        SET
            SPRINT_DELETED_YN = 'Y'
        WHERE
            SPRINT_CODE = ?
    `;

    return query;
}