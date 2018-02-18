const amqp = require('amqplib');
const { Buffer } = require('buffer');
const EventEmitter = require('events');

const { pid } = process;
const emitter = new EventEmitter();

const W_NAME = 'node_chat';
const E_PAYLOAD_RECEIVED = 'payload_received';

function Broker({ queue, channel }) {
  channel.consume(queue, msg => {
    try {
      const { pid: msgPid, payload } = JSON.parse(msg.content.toString());

      if (msgPid !== pid) {
        emitter.emit(E_PAYLOAD_RECEIVED, payload);
      }
    } catch (err) {
      console.warn(
        '[Broker] An error has occurred while processing message',
        err
      );
    }

    channel.ack(msg);
  });

  return {
    subscribe: callback => {
      emitter.addListener(E_PAYLOAD_RECEIVED, callback);

      return () => emitter.removeListener(E_PAYLOAD_RECEIVED, callback);
    },
    publish: payload =>
      channel.sendToQueue(
        queue,
        Buffer.from(JSON.stringify({ payload, pid, name: W_NAME }))
      )
  };
}

module.exports = function Amqp({ user, password, hostname, vhost, queue }) {
  return new Promise((resolve, reject) => {
    amqp
      .connect(`amqp://${user}:${password}@${hostname}/${vhost}`)
      .then(connection =>
        connection
          .createChannel()
          .then(channel =>
            channel
              .assertQueue(queue)
              .then(() => resolve(Broker({ queue, channel })))
          )
      )
      .catch(reject);
  });
};
