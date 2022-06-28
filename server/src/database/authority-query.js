exports.insertAuth = () => {

    return `
        INSERT 
            INTO TBL_AUTHORITY (
                  AUTHORITY_NAME
                , AUTHORITY_ACTIVATED_YN
                , AUTHORITY_EXPOSURE_ORDER
                , AUTHORITY_DESCRIPTION
                , AUTHORITY_DATE
            ) VALUES (
                  ?
                , ?
                , ?
                , ?
                , DATE_FORMAT(SYSDATE(), '%Y-%m-%d %H:%i:%S')
            )
    `;
};

exports.selectAuths = (params) => {

    let query = `
        SELECT
            AUTHORITY_CODE
            , AUTHORITY_NAME
            , AUTHORITY_DESCRIPTION
            , AUTHORITY_ACTIVATED_YN
            , AUTHORITY_DATE
            , AUTHORITY_EXPOSURE_ORDER
        FROM TBL_AUTHORITY
        WHERE 0 = 0
    `;
    
    if(params.searchValue !== undefined && params.searchCondition !== undefined) {
        query += `AND ${'AUTHORITY_' + params.searchCondition.toUpperCase()} LIKE '%${params.searchValue}%'`;
    }

    if(params.offset !== undefined && params.limit !== undefined) {
        query += `LIMIT ${params.offset}, ${params.limit}`;
    }

    return query;
};

exports.selectAuth = () => {

    return `
        SELECT
          AUTHORITY_CODE
        , AUTHORITY_NAME
        , AUTHORITY_DESCRIPTION
        , AUTHORITY_ACTIVATED_YN
        , AUTHORITY_DATE
        , AUTHORITY_EXPOSURE_ORDER
        FROM TBL_AUTHORITY
        WHERE AUTHORITY_CODE = ?
    `;
};

exports.updateAuth = () => {

    return `
        UPDATE TBL_AUTHORITY
        SET
              AUTHORITY_NAME = ?
            , AUTHORITY_ACTIVATED_YN = ?
            , AUTHORITY_EXPOSURE_ORDER = ?
            , AUTHORITY_DESCRIPTION =?
        WHERE
            AUTHORITY_CODE = ?
    `;
};

exports.deleteAuth = () => {

    return `
        DELETE FROM TBL_AUTHORITY
        WHERE
            AUTHORITY_CODE = ?
    `;
};