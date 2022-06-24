exports.selectMembers = () => {

    return `
        SELECT
              A.MEMBER_CODE
            , A.MEMBER_ID
            , A.EMAIL
            , A.NAME
            , A.PHONE
            , A.COMPANY
            , A.PURPOSE
            , A.CREATE_DATE
            , A.LAST_LOGIN_DATE
            , A.DORMANT
          FROM TBL_MEMBER A
    `;
};

exports.selectMemberWithMemberCode = () => {
    return `
        SELECT
              A.MEMBER_CODE
            , A.MEMBER_ID
            , A.PASSWORD
            , A.EMAIL
            , A.NAME
            , A.PHONE
            , A.COMPANY
            , A.PURPOSE
            , A.CREATE_DATE
            , A.LAST_LOGIN_DATE
            , A.DORMANT
          FROM TBL_MEMBER A
         WHERE A.MEMBER_CODE = ?
    `;
}

exports.selectMemberWithMemberId = () => {
  return `
      SELECT
            A.MEMBER_CODE
          , A.PASSWORD
          , A.MEMBER_ID
          , A.EMAIL
          , A.NAME
          , A.PHONE
          , A.COMPANY
          , A.PURPOSE
          , A.CREATE_DATE
          , A.LAST_LOGIN_DATE
          , A.DORMANT
        FROM TBL_MEMBER A
       WHERE A.MEMBER_ID = ?
  `;
}

exports.insertMember = () => {
    
    return `
        INSERT INTO TBL_MEMBER (
            MEMBER_ID
          , PASSWORD
          , EMAIL
          , NAME
          , PHONE
          , COMPANY
          , PURPOSE
          , CREATE_DATE
          , LAST_LOGIN_DATE
          , DORMANT
        ) VALUES (
            ?
          , ?
          , ?
          , ?
          , ?
          , ?
          , ?
          , DATE_FORMAT(NOW(), '%d/%m/%y %T')
          , DATE_FORMAT(NOW(), '%d/%m/%y %T')
          , 'N'
        )    
    `;
}



exports.updateLastLogin = () => {
    
  return `
      UPDATE 
          TBL_MEMBER
      SET
          LAST_LOGIN_DATE = DATE_FORMAT(NOW(), '%d/%m/%y %T')
      WHERE MEMBER_ID = ?
  `;
}