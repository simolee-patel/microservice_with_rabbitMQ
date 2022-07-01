const express = require('express');
const userController = require('../controller/user.controller');
const { subscribeMessage } = require('../../service/app.event');
const router = express.Router()
module.exports = function (router, channel) {

    const service = userController;
    subscribeMessage(channel, service)

    router.post('/sign_up', function (req, res) {
        return userController.signUp(req).then(response => {
            return res.status(response.status).send(response);
        })
    });

    router.post('/log_in', function (req, res) {
        return userController.logIn(req).then(response => {
            return res.status(response.status).send(response)
        })
    });

    router.post('/auto_login', function (req, res) {
        return userController.autoLogin(req).then(response => {
            return res.status(response.status).send(response)
        })
    });

}