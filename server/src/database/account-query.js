exports.selectMembers = () => {

    return `
        SELECT
              A.MEMBER_CODE
            , A.MEMBER_ID
            , A.MEMBER_EMAIL
            , A.MEMBER_PHONE
            , A.MEMBER_CREATED_DATE
            , A.MEMBER_ROLE
            , A.MEMBER_SECESSION_YN
            , A.MEMBER_COMPANY
            , A.MEMBER_OCCUPATION
            , A.MEMBER_PURPOSE
            , A.MEMBER_NAME
          FROM TBL_MEMBER A
         WHERE A.MEMBER_ID NOT IN ('admin')
    `;
};

exports.searchMember = (searchInfo) => {

  let query = `
          SELECT
                  A.MEMBER_CODE
                , A.MEMBER_ID
                , A.MEMBER_EMAIL
                , A.MEMBER_PHONE
                , A.MEMBER_CREATED_DATE
                , A.MEMBER_ROLE
                , A.MEMBER_SECESSION_YN
                , A.MEMBER_COMPANY
                , A.MEMBER_OCCUPATION
                , A.MEMBER_PURPOSE
                , A.MEMBER_NAME
            FROM TBL_MEMBER A
            WHERE A.MEMBER_ID NOT IN ('admin')
    `;

    if((searchInfo.condition === 'memberId') && searchInfo.value !== undefined) { // 조건 검색
      query += `AND ${'A.MEMBER_ID'} LIKE '%${searchInfo.value}%'`;
    }
    
    if((searchInfo.condition === 'name') && searchInfo.value !== undefined) { // 조건 검색
      query += `AND ${'A.MEMBER_NAME'} LIKE '%${searchInfo.value}%'`;
    }

    console.log('query', query);

    return query;
};

exports.selectMemberWithMemberCode = () => {
    return `
        SELECT
              A.MEMBER_CODE
            , A.MEMBER_ID
            , A.MEMBER_PASSWORD
            , A.MEMBER_EMAIL
            , A.MEMBER_PHONE
            , A.MEMBER_CREATED_DATE
            , A.MEMBER_ROLE
            , A.MEMBER_SECESSION_YN
            , A.MEMBER_COMPANY
            , A.MEMBER_OCCUPATION
            , A.MEMBER_PURPOSE
            , A.MEMBER_NAME
          FROM TBL_MEMBER A
         WHERE A.MEMBER_CODE = ?
    `;
}

exports.selectMemberWithEmail = () => {
  return `
        SELECT
              A.MEMBER_CODE
            , A.MEMBER_ID
            , A.MEMBER_PASSWORD
            , A.MEMBER_EMAIL
            , A.MEMBER_PHONE
            , A.MEMBER_CREATED_DATE
            , A.MEMBER_ROLE
            , A.MEMBER_SECESSION_YN
            , A.MEMBER_COMPANY
            , A.MEMBER_OCCUPATION
            , A.MEMBER_PURPOSE
            , A.MEMBER_NAME
            , A.MEMBER_EMAIL_AUTH
          FROM TBL_MEMBER A
         WHERE A.MEMBER_EMAIL = ?
    `;
}

exports.selectMemberWithMemberId = () => {
  return `
      SELECT
              A.MEMBER_CODE
            , A.MEMBER_ID
            , A.MEMBER_PASSWORD
            , A.MEMBER_EMAIL
            , A.MEMBER_PHONE
            , A.MEMBER_CREATED_DATE
            , A.MEMBER_ROLE
            , A.MEMBER_SECESSION_YN
            , A.MEMBER_COMPANY
            , A.MEMBER_OCCUPATION
            , A.MEMBER_PURPOSE
            , A.MEMBER_NAME
            , A.MEMBER_EMAIL_AUTH
        FROM TBL_MEMBER A
       WHERE A.MEMBER_ID = ?
  `;
}

exports.updateAccountWithToken = () => {
  
  return `
      UPDATE TBL_MEMBER
      SET MEMBER_EMAIL_AUTH = 'Y'  
      WHERE MEMBER_CODE = ?
  `;
}

exports.updateAccountWithTempPWD = () => {

  return `
      UPDATE TBL_MEMBER
      SET MEMBER_PASSWORD = ?
      WHERE MEMBER_CODE = ?
  `;
}

exports.updateMember = () => {
  
  return `
    UPDATE TBL_MEMBER
    SET MEMBER_PHONE = ?
      , MEMBER_COMPANY = ?
      , MEMBER_PURPOSE = ?
    WHERE MEMBER_CODE = ?
  `;
}

exports.updateEmail = () => {

  return `
      UPDATE TBL_MEMBER
      SET MEMBER_EMAIL = ?
      WHERE MEMBER_CODE = ?
  `;
}

exports.insertMember = () => {
    
    return `
        INSERT INTO TBL_MEMBER (
              MEMBER_ID
            , MEMBER_PASSWORD
            , MEMBER_NAME
            , MEMBER_EMAIL
            , MEMBER_PHONE
            , MEMBER_CREATED_DATE
            , MEMBER_ROLE
            , MEMBER_COMPANY
            , MEMBER_OCCUPATION
            , MEMBER_PURPOSE
        ) VALUES (
              ?
            , ?
            , ?          
            , ?
            , ?
            , DATE_FORMAT(NOW(), '%d/%m/%y %T')
            , 'ROLE_USER'
            , ?
            , ?          
            , ?
        )    
    `;
}


