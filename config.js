const CHAT_ROOMS = {
  general: { name: 'General', protected: false },
  gaming: { name: 'Gaming', protected: false },
  music: { name: 'Music', protected: false },
  coding: { name: 'Coding', protected: false },
  tech: { name: 'Tech', protected: false },
  politics: { name: 'Politics', protected: false },
  admin: { 
    name: 'Admin', 
    protected: true
  }
};

// Store connected users
const connectedUsers = new Map();

module.exports = {
  CHAT_ROOMS,
  connectedUsers
};
