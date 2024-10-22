const { connectedUsers } = require('./config');

function handleMessage(socket, io, filter, { message, room }) {
  const user = connectedUsers.get(socket.id);
  if (!user) return;

  // Filter inappropriate content
  const filteredMessage = filter.clean(message);

  // Broadcast message to room
  io.to(room).emit('receive_message', {
    message: filteredMessage,
    author: user.username,
    timestamp: new Date(),
  });
}

module.exports = { handleMessage };
