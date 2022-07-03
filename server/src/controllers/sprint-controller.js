const HttpStatus = require('http-status');
const SprintService = require('../services/sprint-service');

exports.addSprint = async (req, res, next) => {
    
    await SprintService.addSprint(req.body)
    .then((results) => {

        res.status(HttpStatus.OK).json({
            status: HttpStatus.CREATED,
            message: 'successfully add sprint',
            results: results
        });
    })
    .catch((err) =>{

        res.status(HttpStatus.BAD_REQUEST).json({
            status: HttpStatus.BAD_REQUEST,
            message: err
        });
    });
}

exports.viewSprints = async (req, res, next) => {

    await SprintService.viewSprints(req.query)
    .then((results) => {

        res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            message: 'successfully view sprints',
            results: results
        });
    })
    .catch((err) =>{

        res.status(HttpStatus.BAD_REQUEST).json({
            status: HttpStatus.BAD_REQUEST,
            message: err
        });
    });
}

exports.viewSprintHistory = async (req, res, next) => {

    await SprintService.viewSprintHistory(req.query)
    .then((results) => {

        res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            message: 'successfully view sprint history',
            results: results
        });
    })
    .catch((err) =>{

        res.status(HttpStatus.BAD_REQUEST).json({
            status: HttpStatus.BAD_REQUEST,
            message: err
        });
    });
}

exports.viewSprint = async (req, res, next) => {

    await SprintService.viewSprint(req.params.sprintCode)
    .then((results) => {

        res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            message: 'successfully view sprint',
            results: results
        });
    })
    .catch((err) =>{

        res.status(HttpStatus.BAD_REQUEST).json({
            status: HttpStatus.BAD_REQUEST,
            message: err
        });
    });
}

exports.editSprint = async (req, res, next) => {

    await SprintService.editSprint(req.body)
    .then((results) => {

        res.status(HttpStatus.OK).json({ 
            status: HttpStatus.OK,
            message: 'successfully update sprint',
            results: results
        })
    })
    .catch((err) =>{

        res.status(HttpStatus.BAD_REQUEST).json({
            status: HttpStatus.BAD_REQUEST,
            message: err
        });
    });
}

exports.deleteSprint = async (req, res, next) => {

    await SprintService.deleteSprint(req.body)
    .then((results) => {

        res.status(HttpStatus.OK).json({ 
            status: HttpStatus.OK,
            message: 'successfully delete sprint',
            results: results
        })
    })
    .catch((err) =>{

        res.status(HttpStatus.BAD_REQUEST).json({
            status: HttpStatus.BAD_REQUEST,
            message: err
        });
    });
}