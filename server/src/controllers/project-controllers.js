const HttpStatus = require('http.status');
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