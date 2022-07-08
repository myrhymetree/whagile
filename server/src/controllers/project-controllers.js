const HttpStatus = require('http-status');
const ProjectService = require('../services/project-service');

exports.selectProjects = async (req, res, next) => {

    console.log(req.query)
    await ProjectService.selectProjects(req.query)
        .then((results) => {

            res.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                message: '프로젝트 목록을 조회했습니다.',
                results: results
            });

        }).catch((err) =>{

            res.status(HttpStatus.BAD_REQUEST).json({
                status: HttpStatus.BAD_REQUEST,
                message: err
            });

        });
};

exports.selectProject = async (req, res, next) => {
    console.log("req.params",req.params.projectCode);
    await ProjectService.selectProject(req.params.projectCode)
        .then((result) => {

            res.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                message: 'successfully selected Project',
                results: result
            });
        }).catch((err) => {

            res.status(HttpStatus.BAD_REQUEST).json({
                status: HttpStatus.OK,
                message: err

            });
        });
};

exports.registProject = async (req, res, next) => {

    await ProjectService.registProject(req.body)
        .then((result) => {
            res.status(HttpStatus.CREATED).json({
                status: HttpStatus.CREATED,
                message: 'successfully regist Project',
                results: result
            });
        }).catch((err) => {

            res.status(HttpStatus.BAD_REQUEST).json({
                status:HttpStatus.BAD_REQUEST,
                message: err
            });
        });
};

exports.modifyProject = async (req, res, next) => {
    await ProjectService.modifyProject(req.body)
        .then((result) => {

            res.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                message: 'successfully updatedProject!!',
                results: result
            });
        }).catch((err) => {
            
            res.status(HttpStatus.BAD_REQUEST).json({
                status:HttpStatus.BAD_REQUEST,
                message: err
            });
        });
}

exports.removeProject = async (req, res, next) => {
    console.log("req.params",req.params.projectCode);
    await ProjectService.removeProject(req.params.projectCode)
        .then((result) => {

            res.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                message: 'successfully removedProject!!',
                results: result
            });
        }).catch((err) => {

            res.status(HttpStatus.BAD_REQUEST).json({
                status: HttpStatus.BAD_REQUEST,
                message: err
            });
        });
}

exports.findProjectMember = async (req, res, next) => {
    
    await ProjectService.findProjectMember(req.params.projectCode)
        .then((results) => {

            res.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                message: '프로젝트 팀원 목록을 조회했습니다.',
                results: results
            });
        }).catch((err) => {

            res.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                message: err
            });
        });
}

exports.registProjectMember = async (req, res, next) => {

    await ProjectService.registProjectMember(req.body)
        .then((result) => {
            res.status(HttpStatus.CREATED).json({
                status: HttpStatus.CREATED,
                message: 'successfully regist ProjectMember',
                results: result
            });
        }).catch((err) => {

            res.status(HttpStatus.BAD_REQUEST).json({
                status:HttpStatus.BAD_REQUEST,
                message: err
            });
        });
}

exports.removeProjectMember = async (req, res, next) => {
console.log('이거이거',req.params)
    await ProjectService.removeProjectMember(req.params)
        .then((result) => {
            res.status(HttpStatus.OK).json({
                stauts: HttpStatus.OK,
                message: '해당 프로젝트에서 팀원을 제외했습니다.',
                results: result
            });
        }).catch((err) => {

            res.status(HttpStatus.BAD_REQUEST).json({
                status:HttpStatus.BAD_REQUEST,
                message: err
            });
        });
}

