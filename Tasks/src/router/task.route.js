const express = require('express');
const taskController = require('../controller/task.controller');
const router = express.Router()

const { authenticateJWT } = require("../middleware/auth")
module.exports = function (router, channel) {
    router.get('/test', function (req, res) {
        return res.status(200).send("helloooo")
    })

    router.post('/add_task', authenticateJWT, function (req, res) {
        return taskController.addTask(req, channel).then(response => {
            return res.status(response.status).send(response);
        })
    });
    router.post('/remove_task/:id', authenticateJWT, function (req, res) {
        return taskController.removeTask(req, channel).then(response => {
            return res.status(response.status).send(response);
        })
    });

    router.post('/update_task', authenticateJWT, function (req, res) {
        return taskController.updateTask(req, channel).then(response => {
            return res.status(response.status).send(response);
        })
    });

}