const express = require('express');
const { PORT } = require('./config');
const { databaseConnection } = require('./database');
const router = express.Router();
const userRouter = require('./router/task.route')
const bodyParser = require('body-parser');
const { createChannel } = require('./utils');

const StartServer = async () => {

    const app = express();
    const channel = createChannel()

    await databaseConnection();
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    userRouter(app, channel)

    app.listen(PORT, () => {
        console.log(`listening to port ${PORT}`);
    })
        .on('error', (err) => {
            console.log(err);
            process.exit();
        })
}

StartServer();