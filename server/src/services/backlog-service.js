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
            newHistory.historyItem = '';
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

/* 백로그 수정 요청 */
exports.editBacklog = (modifyingContent) => {

    return new Promise(async (resolve, reject) => {
        
        const connection = getConnection();
        connection.beginTransaction();

        try {
            /* 백로그 데이터 수정 */
            const editResult = await BacklogRepository.editBacklog(connection, modifyingContent);

            /* 변경된 백로그 행 조회 */
            const changedBacklog = await BacklogRepository.selectBacklogByBacklogCode(connection, modifyingContent.backlogCode);
            
            /* 백로그 히스토리 데이터 생성 */
            const newHistory = createNewHistory();
            
            newHistory.historyContent = modifyingContent.changedValue;
            newHistory.backlogCode = modifyingContent.backlogCode;
            newHistory.projectCode = modifyingContent.projectCode;
            newHistory.memberCode = modifyingContent.memberCode;
            switch(modifyingContent.changedCategory) {
                case 'title': 
                    newHistory.historyItem = '백로그 제목';
                    break;
                case 'description': 
                    newHistory.historyItem = '백로그 설명';
                    break;
                case 'category':
                    newHistory.historyItem = '분류';
                    break;
                case 'progressStatus': 
                    newHistory.historyItem = '진행 상태';
                    break;
                case 'urgency': 
                    newHistory.historyItem = '긴급도';
                    break;
                case 'issue': 
                    newHistory.historyItem = '이슈 여부';
                    break;
                default: 
                    newHistory.historyItem = '';
                    break;
            }
            console.log(`newHistory: ${newHistory}`);

            /* 백로그 히스토리 추가 */
            const newHistoryInseted = await BacklogRepository.insertBacklogHistory(connection, newHistory);
            
            /* 추가한 백로그 히스토리 행 조회 */
            const insertedHistory = await BacklogRepository.selectHistoryByHistoryCode(connection, newHistoryInseted.insertId);

            /* 수정된 백로그, 추가한 백로그 히스토리를 result 객체에 담아 반환한다 */
            const results = {
                changedBacklog: changedBacklog,
                insertedHistory: insertedHistory
            };

            connection.commit();

            resolve(results);

        } catch(err) {
            connection.rollback();

            reject(err);

        } finally {
            connection.end();
        }
    });
};

/* 백로그 삭제 요청 */
exports.removeRequest = (removeRequest) => {

    return new Promise(async (resolve, reject) => {

        const connection = getConnection();
        connection.beginTransaction();

        try {

            /* 백로그 데이터 삭제 */
            const deleteResult = await BacklogRepository.deleteBacklog(connection, removeRequest.backlogCode);

            /* 변경된 백로그 행 조회 */
            const changedBacklog = await BacklogRepository.selectBacklogByBacklogCode(connection, removeRequest.backlogCode);

            /* 백로그 히스토리 데이터 생성 */
            const newHistory = createNewHistory();
            
            newHistory.historyContent = '삭제';
            newHistory.backlogCode = removeRequest.backlogCode;
            newHistory.projectCode = removeRequest.projectCode;
            newHistory.memberCode = removeRequest.memberCode;
            console.log(`newHistory: ${newHistory}`);

            /* 백로그 히스토리 추가 */
            const newHistoryInseted = await BacklogRepository.insertBacklogHistory(connection, newHistory);

            /* 추가한 백로그 히스토리 행 조회 */
            const insertedHistory = await BacklogRepository.selectHistoryByHistoryCode(connection, newHistoryInseted.insertId);

            /* 수정된 백로그, 추가한 백로그 히스토리를 result 객체에 담아 반환한다 */
            const results = {
                changedBacklog: changedBacklog,
                insertedHistory: insertedHistory
            };

            connection.commit();

            resolve(results);

        } catch(err) {
            connection.rollback();
            
            reject(err);

        } finally {
            connection.end();
        }
    });
};

/* 백로그 히스토리 조회 요청 */
exports.findBacklogHistories = (params) => {

    return new Promise((resolve, reject) => {

        const connection = getConnection();

        const results = BacklogRepository.selectBacklogHistories(connection, params);

        connection.end();

        resolve(results);
    });
};