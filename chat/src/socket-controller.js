const socketIo = require('socket.io');

module.exports = function SocketController({ server, broker }) {
  return socketIo(server).on('connection', socket => {
    const unsubscribeBroker = broker.subscribe(data => {
      socket.emit('form_status', { data, timestamp: Date.now() });
    });

    socket
      .on('form', data => {
        broker.publish(data);
        socket.emit('form_status', {
          message: 'Message has sent to broker',
          timestamp: Date.now()
        });
      })
      .on('disconnect', unsubscribeBroker);
  });
};
