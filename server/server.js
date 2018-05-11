const express = require('express');
const socket = require('socket.io');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const characterRoute = require('./route/characters');

const app = express();
const router = express.Router();

const port = process.env.API_PORT || 3001;
app.get('env');
console.log('mongo URI', process.env.MONGODB_URI);
console.log(process.env.NODE_ENV);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/** ---------- CORS ---------- **/
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    next();
});

/** ---------- ROUTES ---------- **/
app.use('/characters', characterRoute);

/** ---------- MONGOOSE CONNECTION HANDLING ---------- **/
const databaseUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/initiative';
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