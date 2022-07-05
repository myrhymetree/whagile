const HttpStatus = require('http-status');
const AccountService = require('../services/account-service');
const AccountUtils = require('../util/account-utils');

exports.selectAccounts = async (req, res, next) => {

    await AccountService.selectAccounts()
        .then((results) => {

            res.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                message: 'successfully selectAccounts!!',
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

exports.selectAccount = async (req, res, next) => {

    await AccountService.selectAccountWithMemberCode(req.query.code)
        .then((results) => {

            res.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                message: 'successfully selectAccount!!',
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

exports.emailAuth = async (req, res, next) => {
    
    console.log(req.query);

    await AccountService.emailAuthWithToken(req.query)
    .then((result) => {

        res.redirect('http://localhost:3000/');

    })
    .catch((err) =>{
        console.log(err);
        res.status(HttpStatus.BAD_REQUEST).json({
            status: HttpStatus.BAD_REQUEST,
            message: err
        });

    });

}

exports.registerAccount = async (req, res, next) => {

    console.log(req.body.data);

    await AccountService.registerAccount(req.body.data)
        .then((result) => {

            res.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                message: 'successfully register Account!!',
                results: result
            });

        })
        .catch((err) =>{

            res.status(HttpStatus.BAD_REQUEST).json({
                status: HttpStatus.BAD_REQUEST,
                message: err
            });

        });
};

exports.loginAccount = async (req, res, next) => {
    console.log('loginAccount called');

    await AccountService.loginAccount(req.body)
        .then((resData) => {
            
            res.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                message: 'successfully Login!!',
                accessToken: resData.token,
                result: resData.account
            });

        })
        .catch((err) =>{

            res.status(HttpStatus.BAD_REQUEST).json({
                status: HttpStatus.BAD_REQUEST,
                message: err
            });

        });

};

exports.searchID = async (req, res, next) => {

    console.log('searchID called');
    const email = req.query.email;
    await AccountService.selectAccountAndSendEmail(email)
        .then((resData) => {
            console.log(resData);
            res.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                message: 'successfully Search ID!!',
                result: resData
            });

        })
        .catch((err) =>{
            res.status(HttpStatus.BAD_REQUEST).json({
                status: HttpStatus.BAD_REQUEST,
                message: err
            });

        });

};

exports.updateTempPwd = async (req, res, next) => {

    console.log('updateTempPwd called');
    console.log(req.query);
    const memberInfo = req.query;
    await AccountService.updateAccountWithTempPwd(memberInfo)
        .then((resData) => {
            console.log(resData);
            res.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                message: 'successfully Update PWD!!'
            });

        })
        .catch((err) =>{
            res.status(HttpStatus.BAD_REQUEST).json({
                status: HttpStatus.BAD_REQUEST,
                message: err
            });
        });   
}

exports.updatePwd = async (req, res, next) => {
    console.log('updatePwd called');    
    const pwInfo = req.body.pwdUpdateData;
    
    await AccountService.updateAccountWithPwd(pwInfo)
        .then((resData) => {
            console.log(resData);
            res.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                message: 'successfully Update PWD!!'
            });

        })
        .catch((err) =>{
            res.status(HttpStatus.BAD_REQUEST).json({
                status: HttpStatus.BAD_REQUEST,
                message: err
            });
        });   
}