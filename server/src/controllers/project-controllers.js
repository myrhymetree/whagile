const HttpStatus = require('http-status');
const ProjectService = require('../services/project-service');

exports.selectProjects = async (req, res, next) => {

    await ProjectService.selectProjects()
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