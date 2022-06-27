const backlogQuery = require('../database/backlog-query');
const BacklogDTO = require('../dto/backlog/backlog-response-dto');

/* 백로그 목록 조회를 요청하는 레파지토리 메소드 */
exports.selectBacklogs = (connection, params) => {

    return new Promise((resolve, reject) => {
        
        connection.query(
            backlogQuery.selectBacklogs(params),
            (err, results, fields) => {
                
                if(err) {
                    reject(err);
                    console.log('err가 났어 ', err);
                }

                const backlogs = [];
                for(let i = 0; i < results.length; i++) {
                    backlogs.push(new BacklogDTO(results[i]));
                }

                resolve(backlogs);
            }
        );
    });
};