const HttpStatus = require('http-status');
const AuthorityService = require('../services/authority-service');

exports.addAuth = async (req, res, next) => {
    
    await AuthorityService.addAuth(req.body)
    .then((results) => {

        res.status(HttpStatus.OK).json({
            status: HttpStatus.CREATED,
            message: 'successfully add authority',
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

exports.viewAuths = async (req, res, next) => {

    await AuthorityService.viewAuths(req.query)
    .then((results) => {

        res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            message: 'successfully view authorities',
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

exports.viewAuth = async (req, res, next) => {
    
    await AuthorityService.viewAuth(req.params.authorityCode)
    .then((results) => {

        res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            message: 'successfully view authority',
            results: results
        });
    })
    .catch((err) => {
        
        res.status(HttpStatus.BAD_REQUEST).json({
            status: HttpStatus.BAD_REQUEST,
            message: err
        });
    })
}

exports.editAuth = async (req, res, next) => {

    await AuthorityService.editAuth(req.body)
    .then((results) => {

        res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            message: 'successfully edit authority',
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

exports.deleteAuth = async (req, res, next) => {
    
    await AuthorityService.deleteAuth(req.body.authorityCode)
    .then((results) => {

        res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            message: 'successfully delete authority',
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