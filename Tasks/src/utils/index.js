const axios = require("axios")
const amqplib = require('amqplib');
const { EXCHANGE_NAME } = require("../../../Users/src/config");
const { MESSAGE_BROKER_URL } = require("../config");

module.exports.FormateData = (data) => {
    if (data) {
        return { data }
    } else {
        throw new Error('Data Not found!')
    }
}

//=========================== MESSAGE QUEUE ================================//

module.exports.createChannel = async () => {
    try {
        const connection = amqplib.connect(MESSAGE_BROKER_URL);
        const channel = (await connection).createChannel()
        await (await channel).assertExchange(EXCHANGE_NAME, 'direct', false)
        return channel;
    } catch (err) {

    }

}

module.exports.publishMessage = async (channel, binding_key, message) => {
    try {
        await (await channel).publish(EXCHANGE_NAME, binding_key, Buffer.from(message))
    } catch (err) {
        throw err
    }
}