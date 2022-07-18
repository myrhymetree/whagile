const getConnection = require('../database/connection');
const SprintRepository = require('../repositories/sprint-repo');
const TasksRepository = require('../repositories/tasks-repo');

exports.addSprint = (params) => {

    return new Promise(async (resolve, reject) => {
        
        const connection = getConnection();
    
        connection.beginTransaction();

        try {
            
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
            
            await SprintRepository.updateTaskToBacklogBySprintCode(connection, params.sprintCode);  // 진행 전, 진행 중의 일감들을 백로그로 만듦

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

        const results = {
            sprintsCount: sprintsCount[0].COUNT,
        }

        connection.end();

        resolve(results);
    });
}

exports.editSprintProgress = (params) => {

    return new Promise(async (resolve, reject) => {
        
        const connection = getConnection();

        connection.beginTransaction();

        try {

            let results = [];

            if(params.sprintProgressStatus === 'Y') { // 스프린트 중지: progressStatus='N'으로 변경, 일감은 백로그로

                await SprintRepository.updateSprintProgress(connection, {
                    sprintCode: params.sprintCode,
                    sprintProgressStatus: 'N'
                });

                await SprintRepository.updateTaskToBacklogBySprintCode(connection, params.sprintCode);  // 진행 전, 진행 중의 일감들을 백로그로 만듦

            } else { // 스프린트 시작: 진행중인 스프린트 체크해서 있으면 중지하고 progressStatus='Y', 없으면 progressStatus='Y'만

                const sprintOnProgress = await SprintRepository.selectSprints(connection, {
                    projectCode: params.projectCode,
                    searchCondition: 'progress_status',
                    searchValue: 'y'
                });

                if(sprintOnProgress.length > 0) {
                    
                    await SprintRepository.updateSprintProgress(connection, {
                        sprintCode: sprintOnProgress[0].sprintCode,
                        sprintProgressStatus: 'N'
                    });

                    await SprintRepository.updateTaskToBacklogBySprintCode(connection, sprintOnProgress[0].sprintCode);
                } 

                await SprintRepository.updateSprintProgress(connection, {
                    sprintCode: params.sprintCode,
                    sprintProgressStatus: 'Y'
                });
            }

            connection.commit();

            resolve(results);
        } catch (err) {

            connection.rollback();

            reject(err);
        } finally {

            connection.end();
        }
    });
}