const socketIo = require('socket.io');

function handleConnection(socket) {
  socket.on('form', data => {
    socket.emit('form_status', { data, timestamp: Date.now() });
  });
}

module.exports = function Socket(httpClient) {
  return socketIo(httpClient).on('connection', handleConnection);
};
