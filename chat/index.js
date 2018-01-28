const httpServer = require('http');
const Socket = require('./src/socket');

const NODE_PORT = process.env.NODE_PORT || 3000;

const server = httpServer.createServer();

Socket(server);

server.listen(NODE_PORT, () => {
  process.stdout.write(`Socket is ready on port ${NODE_PORT}`);
});
