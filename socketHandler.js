const { CHAT_ROOMS, connectedUsers } = require('./config');
const { handleMessage } = require('./messageHandler');

function handleConnection(socket, io, filter) {
  console.log('User connected:', socket.id);

  socket.on('join_room', ({ room, username, password }) => {
    if (!CHAT_ROOMS[room]) {
      socket.emit('error', 'Room does not exist');
      return;
    }

    // Check if the room is protected
    if (CHAT_ROOMS[room].protected) {
      // Validate password
      if (password !== process.env.ADMIN_ROOM_PASSWORD) {
        socket.emit('error', 'Invalid password');
        return;
      }
    }

    // Leave previous rooms
    Array.from(socket.rooms).forEach((prevRoom) => {
      if (prevRoom !== socket.id) {
        socket.leave(prevRoom);
      }
    });
    // Join new room
    socket.join(room);
    connectedUsers.set(socket.id, { username, room });
    
    // Broadcast join message
    socket.to(room).emit('user_joined', {
      message: `${username} has joined the room`,
      timestamp: new Date(),
    });
    // Send welcome message
    socket.emit('room_joined', {
      room,
      message: `Welcome to ${CHAT_ROOMS[room].name}`,
    });
  });

  socket.on('send_message', (data) => handleMessage(socket, io, filter, data));
  
  socket.on('disconnect', () => {
    const user = connectedUsers.get(socket.id);
    if (user) {
      socket.to(user.room).emit('user_left', {
        message: `${user.username} has left the room`,
        timestamp: new Date(),
      });
      connectedUsers.delete(socket.id);
    }
  });
}

module.exports = { handleConnection };
