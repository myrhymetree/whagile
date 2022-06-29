const getConnection = require('../database/connection');
const BacklogRepository = require('../repositories/backlog-repo');

/* 히스토리 생성 함수 */
createNewHistory = () => {
    
    const newHistory = {
        historyItem: '',    
        historyContent: '',  
        historyDate: '',  
        backlogCode: 0,   
        projectCode: 0,   
        memberCode: 0
    };
    
    /* 히스토리 발생일 정보 생성 */
    const insertDate = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString();    //히스토리 발생일

    newHistory.historyDate = insertDate;

    return newHistory;
};

/* 백로그 목록 조회 요청 */
exports.findBacklogs = (params) => {

    return new Promise((resolve, reject) => {

        const connection = getConnection();

        const results = BacklogRepository.selectBacklogs(connection, params);

        connection.end();

        resolve(results);
    });
};

/* 개별 백로그 상세 조회 요청 */
exports.findBacklogsByBacklogCode = (backlogCode) => {

    return new Promise((resolve, reject) => {

        const connection = getConnection();

        const results = BacklogRepository.selectBacklogByBacklogCode(connection, backlogCode);

        connection.end();

        resolve(results);
    });
};

/* 새로운 백로그 생성 요청 */
exports.registNewBacklog = (backlog) => {

    return new Promise(async (resolve, reject) => {

        const connection = getConnection();
        connection.beginTransaction();

        try {
            /* 백로그 데이터 삽입 */
            const insertNewBacklogResult = await BacklogRepository.insertNewBacklog(connection, backlog);
            console.log(`insertNewBacklogResult 확인 : ${insertNewBacklogResult.insertId}`)
            
            /* 백로그 히스토리 데이터 생성 */
            const newHistory = createNewHistory();
            newHistory.historyItem = '백로그';
            newHistory.historyContent = '생성';
            newHistory.backlogCode = insertNewBacklogResult.insertId;
            newHistory.projectCode = backlog.projectCode;
            newHistory.memberCode = backlog.creatorCode;
            
            /* 추가한 백로그 행 조회 */
            const insertedBacklog = await BacklogRepository.selectBacklogByBacklogCode(connection, insertNewBacklogResult.insertId);

            /* 백로그 히스토리 데이터 삽입 */
            const insertNewHistoryResult = await BacklogRepository.insertBacklogHistory(connection, newHistory);

            /* 추가한 백로그 히스토리 행 조회 */
            const insertedHistory = await BacklogRepository.selectHistoryByHistoryCode(connection, insertNewHistoryResult.insertId);
            
            connection.commit();

            /* 삽입한 백로그, 백로그 히스토리를 result 객체에 담아 반환한다 */
            const results = {
                insertedBacklog: insertedBacklog, 
                insertedHistory: insertedHistory
            };

            resolve(results);

        } catch(err) {
            console.log(`service에서 err확인 : ${err}`)
            connection.rollback();

            reject(err);

        } finally {
            connection.end();
        }
    });
};
