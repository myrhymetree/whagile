const getConnection = require('../database/connection');
const SprintRepository = require('../repositories/sprint-repo');
const TasksRepository = require('../repositories/tasks-repo');

exports.addSprint = (params) => {

    return new Promise(async (resolve, reject) => {
        
        const connection = getConnection();
    
        connection.beginTransaction();

        try {
            console.log(7979, params.newBacklogs)
            const results = await SprintRepository.insertSprint(connection, params);
            
            params.currentInfo.sprintCode = results.insertId;

            // 스프린트 히스토리
            let sprintHitoryItem = ['스프린트이름'];

            if(params.sprintTarget) {
                sprintHitoryItem.push('스프린트목표')
            }
            if(params.sprintStartDate) {
                sprintHitoryItem.push('시작일')
            }
            if(params.sprintEndDate) {
                sprintHitoryItem.push('종료일')
            }

            let sprintHistoryContent = '생성'
            
            let sprintHistory = {
                sprintHitoryItem: sprintHitoryItem,
                sprintHistoryContent: sprintHistoryContent
            }

            SprintRepository.insertSprintHistory(connection, sprintHistory, params.currentInfo);

            sprintHitoryItem = [];
            //! 스프린트 히스토리

            if(params.hasOwnProperty('changedTasks')) {

                if(params.changedTasks.hasOwnProperty('oldBacklogs')) {
                    
                    const oldBacklogs = params.changedTasks.oldBacklogs;

                    if(oldBacklogs.length > 0) sprintHitoryItem.push('기존 백로그');

                    // 기존 백로그를 스프린트에 추가
                    for(let i = 0; i < oldBacklogs.length; i++) {
                        SprintRepository.updateBacklogToTask(connection, oldBacklogs[i], params.currentInfo);
                    }
                }

                if(params.changedTasks.hasOwnProperty('newBacklogs')) {
                    
                    const newBacklogs = params.changedTasks.newBacklogs;

                    if(newBacklogs.length > 0) sprintHitoryItem.push('신규 백로그');
                    
                    // 신규 백로그를 스프린트에 추가
                    for(let i = 0; i < newBacklogs.length; i++) {
                        SprintRepository.insertTask(connection, newBacklogs[i], params.currentInfo);
                    }
                }
            }

            // 스프린트 히스토리
            if(sprintHitoryItem.length > 0) {
                sprintHistoryContent = '추가'
            }

            sprintHistory = {
                sprintHitoryItem: sprintHitoryItem,
                sprintHistoryContent: sprintHistoryContent
            }

            SprintRepository.insertSprintHistory(connection, sprintHistory, params.currentInfo);
            //! 스프린트 히스토리

            connection.commit();
            
            resolve(results);

        } catch(err) {

            connection.rollback();

            reject(err);
        } finally {
            connection.end();
        }
    });
}

exports.viewSprints = (params) => {

    return new Promise(async (resolve, reject) => {
        
        const connection = getConnection();

        const sprints = await SprintRepository.selectSprints(connection, params);
        
        for(let i = 0; i < sprints.length; i++) {
            sprints[i].tasks = await SprintRepository.selectTasks(connection, {sprintCode: sprints[i].sprintCode});
        }

        connection.end();

        resolve(sprints);
    });
}

exports.viewSprintHistory = (params) => {

    return new Promise((resolve, reject) => {
        
        const connection = getConnection();

        const results = SprintRepository.selectSprintHistory(connection, params);

        connection.end();

        resolve(results);
    });
}

exports.viewSprint = (sprintCode) => {

    return new Promise(async (resolve, reject) => {
        
        const connection = getConnection();

        const sprints = await SprintRepository.selectSprint(connection, sprintCode);
        
        sprints[0].tasks = await SprintRepository.selectTasks(connection, {sprintCode: sprintCode});
        
        connection.end();
        
        resolve(sprints);
    });
}

exports.editSprint = (params) => {
    
    return new Promise((resolve, reject) => {
        
        const connection = getConnection();

        connection.beginTransaction();

        try {

            const results = SprintRepository.updateSprint(connection, params);

            params.currentInfo.sprintCode = params.sprintCode;

            if(params.hasOwnProperty('changedTasks')) {

                if(params.changedTasks.hasOwnProperty('deletedTasks')) { // 기존 일감 목록에서 삭제된 일감들을 백로그로 전환

                    const deletedTasks = params.changedTasks.deletedTasks;

                    for(let i = 0; i < deletedTasks.length; i++) {
                        SprintRepository.updateTaskToBacklogByBacklogCode(connection, deletedTasks[i]);
                    }
                }

                if(params.changedTasks.hasOwnProperty('oldBacklogs')) { // 기존 백로그를 스프린트에 추가
                    
                    const oldBacklogs = params.changedTasks.oldBacklogs;
                    
                    for(let i = 0; i < oldBacklogs.length; i++) {
                        SprintRepository.updateBacklogToTask(connection, oldBacklogs[i], params.currentInfo);
                    }
                }

                if(params.changedTasks.hasOwnProperty('newBacklogs')) { // 신규 백로그를 스프린트에 추가
                    
                    const newBacklogs = params.changedTasks.newBacklogs;
                    
                    for(let i = 0; i < newBacklogs.length; i++) {
                        SprintRepository.insertTask(connection, newBacklogs[i], params.currentInfo);
                    }
                }
            }

            connection.commit();

            resolve(results);
        } catch (err) {

            connection.rollback();

            reject(err);
        } finally {
            
            connection.end();
        }
    })
}

exports.deleteSprint = (params) => {

    return new Promise(async (resolve, reject) => {
        
        const connection = getConnection();

        connection.beginTransaction();

        try {
            
            await SprintRepository.updateTaskToBacklogBySprintCode(connection, params.sprintCode);

            const results = await SprintRepository.deleteSprint(connection, params);

            connection.commit();

            resolve(results);
        } catch (err) {

            connection.rollback();

            reject(err);
        } finally {
            
            connection.end();
        }
    })
}

exports.viewSprintsCount = (params) => {

    return new Promise(async (resolve, reject) => {
        
        const connection = getConnection();

        const sprintsCount = await SprintRepository.selectSprintsCount(connection, params);

        const tasksCount = await SprintRepository.selectTasksCount(connection, params);

        const backlogsCount = await SprintRepository.selectBacklogsCount(connection, params);

        const results = {
            sprintsCount: sprintsCount[0].COUNT,
            tasksCount: tasksCount[0].COUNT,
            backlogsCount: backlogsCount[0].COUNT,
        }

        connection.end();

        resolve(results);
    });
}