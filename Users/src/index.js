const express = require('express');
const { PORT } = require('./config');
const { databaseConnection } = require('./database');
const router = express.Router();
const userRouter = require('./router/user.route')
const { createChannel } = require('../service/app.event')
const bodyParser = require('body-parser')


const StartServer = async () => {
    let channel = await createChannel()

    const app = express();

    await databaseConnection();
    app.use(bodyParser.urlencoded({ extended: true }));
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