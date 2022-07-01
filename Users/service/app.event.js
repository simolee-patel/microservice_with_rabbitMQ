const { EXCHANGE_NAME, QUEUE_NAME, MESSAGE_BROKER_URL } = require('../src/config');
const CustomerService = require('../src/controller/user.controller');
const amqplib = require('amqplib');
const { TASK_BIND_KEY } = require('../src/config/index');

module.exports.createChannel = async () => {
    try {
        console.log("here")
        const connection = amqplib.connect(MESSAGE_BROKER_URL);
        const channel = (await connection).createChannel()
        await (await channel).assertExchange(EXCHANGE_NAME, 'direct', false)
        return channel;
    } catch (err) {
        console.log("err", err)
    }

}

module.exports.subscribeMessage = async (channel, service) => {
    try {
        console.log("waiting for message")
        const appQueue = await channel.assertQueue(QUEUE_NAME)
        channel.bindQueue(appQueue.queue, EXCHANGE_NAME, TASK_BIND_KEY)

        channel.consume(appQueue.queue, data => {
            console.log("data received");
            service.SubscribeEvents(data.content.toString())
            channel.ack(data)
        })
    } catch (err) {
        throw err
    }
}