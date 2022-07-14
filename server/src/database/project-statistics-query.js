  /* 프로젝트 별 진행상태에 따른 일감 개수 조회 */
  exports.selectContingTaskByProgressStatus = (projectCode) => {
    
    return `
        SELECT
              (SELECT
                      COUNT(BK.BACKLOG_CODE)
                FROM TBL_BACKLOG BK
                WHERE BK.BACKLOG_CATEGORY = '일감'
                  AND BK.BACKLOG_PROGRESS_STATUS = '진행전'
                  AND BK.BACKLOG_DELETED_YN = 'N'
                  AND BK.PROJECT_CODE = ${ projectCode }
              ) PENDING_TASK
            , (SELECT
                      COUNT(BK.BACKLOG_CODE)
                FROM TBL_BACKLOG BK
                WHERE BK.BACKLOG_CATEGORY = '일감'
                  AND BK.BACKLOG_PROGRESS_STATUS = '진행중'
                  AND BK.BACKLOG_DELETED_YN = 'N'
                  AND BK.PROJECT_CODE = ${ projectCode }
              ) PROGRESSING_TASK
            , (SELECT
                      COUNT(BK.BACKLOG_CODE)
                FROM TBL_BACKLOG BK
                WHERE BK.BACKLOG_CATEGORY = '일감'
                  AND BK.BACKLOG_PROGRESS_STATUS = '완료'
                  AND BK.BACKLOG_DELETED_YN = 'N'
                  AND BK.PROJECT_CODE = ${ projectCode }
              ) COMPLETED_TASK
            , (SELECT 
                      COUNT(BK.BACKLOG_CODE)
                FROM TBL_BACKLOG BK
                WHERE BK.BACKLOG_CATEGORY = '일감'
                  AND BK.BACKLOG_DELETED_YN = 'N'
                  AND BK.PROJECT_CODE = ${ projectCode }
              ) TOTAL_TASK;
    `;
  }

  