const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io'); 

const groupChatRoutes = require('./routes/groupChats.js');
const channelRoutes = require('./routes/channels.js');
const userRoutes = require('./routes/users.js');
const messageRoutes = require('./routes/messages.js'); 

const { connectToDatabase } = require('./config/database.js');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());
app.use(bodyParser.json());

connectToDatabase(); 

app.use('/group-chats', groupChatRoutes);
app.use('/channels', channelRoutes);
app.use('/users', userRoutes);
app.use('/messages', messageRoutes); 

io.on('connection', (socket) => {
  //for notifications
});

server.listen(process.env.PORT || 3001, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});