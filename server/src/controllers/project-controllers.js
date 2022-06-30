const HttpStatus = require('http-status');
const ProjectService = require('../services/project-service');

exports.selectProjects = async (req, res, next) => {

    await ProjectService.selectProjects(req.query)
        .then((results) => {

            res.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                message: 'successfully selectProjects!!',
                results: results
            });

        })
        .catch((err) =>{

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
        })
        .catch((err) => {

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
        })
        .catch((err) => {

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
        })
        .catch((err) => {
            
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
        })
        .catch((err) => {

            res.status(HttpStatus.BAD_REQUEST).json({
                status: HttpStatus.BAD_REQUEST,
                message: err
            });
        });
}

