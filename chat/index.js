const httpServer = require('http');
const socketIo = require('socket.io');
const { promisify } = require('util');

const SocketController = require('./src/socket-controller');
const Broker = require('./src/broker');
const HttpController = require('./src/http-controller');

const NODE_PORT = process.env.NODE_PORT;
const {
  BROKER_PASS,
  BROKER_USER,
  BROKER_HOSTNAME,
  BROKER_VHOST,
  BROKER_QUEUE
} = process.env;

const server = httpServer.createServer(HttpController());

Broker({
  password: BROKER_PASS,
  user: BROKER_USER,
  hostname: BROKER_HOSTNAME,
  vhost: BROKER_VHOST,
  queue: BROKER_QUEUE
}).then(broker => {
  SocketController({ server, broker });
  server.listen(NODE_PORT, () => {
    console.log(`Socket is ready on port ${NODE_PORT}`);
  });
});

process.on('unhandledRejection', error => {
  throw error;
});
