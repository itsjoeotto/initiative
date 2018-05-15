const express = require('express');
const socket = require('socket.io');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const characterRoute = require('./route/characters');

const app = express();
const router = express.Router();

const port = process.env.API_PORT || 3001;
// app.get('env');
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/** ---------- ROUTES ---------- **/
app.use('/characters', characterRoute);

/** ---------- MONGOOSE CONNECTION HANDLING ---------- **/
const databaseUri = (process.env.NODE_ENV === 'production') ? process.env.MONGODB_URI : 'mongodb://localhost:27017/initiative';
mongoose.Promise = global.Promise;

mongoose.connect(databaseUri);

mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ', databaseUri);
});

mongoose.connection.on('error', function (err) {
    console.log('Mongoose failed to connect because error:', err);
});

/** ---------- START SERVER ---------- **/
const server = app.listen(port, function () {
    console.log(`api running on port: ${port}`);
});

/** ---------- SOCKETS ---------- **/
io = socket(server);

io.on('connection', (socket) => {
    socket.on('SEND_DATA', function(data){
        io.emit('RECEIVE_DATA', data);
    });
});