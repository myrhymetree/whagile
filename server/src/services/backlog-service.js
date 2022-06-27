const getConnection = require('../database/connection');
const BacklogRepository = require('../repositories/backlog-repo');

/* 백로그 목록 조회 요청 */
exports.findBacklogs = (params) => {

    return new Promise((resolve, reject) => {

        const connection = getConnection();

        const results = BacklogRepository.selectBacklogs(connection, params);

        connection.end();

        resolve(results);
    });
};

/* 새로운 백로그 생성 요청 */
exports.registNewBacklog = (backlog) => {

    return new Promise((resolve, reject) => {

        const connection = getConnection();
        connection.beginTransaction();

        try {
            const result = BacklogRepository.insertNewBacklog(connection, backlog);

            console.log(`service에서 insert결과 확인 : ${result}`)
            connection.commit();

            resolve(result);

        } catch(err) {
            console.log(`service에서 err확인 : ${err}`)
            connection.rollback();

        } finally {
            connection.end();
        }
    });
};



