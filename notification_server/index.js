const express = require('express');
var bodyParser = require('body-parser')
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

var app = express();
// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 9090;

// Store active connections
const connections = {};

app.get('/', (req, res) => {
	res.status(200).send({ message: 'Welcome to the server' });
});

// API endpoint to send notification
app.post('/send-notification', (req, res) => {
	const id = req.body.eventName;
	const message = req.body.message;


	if (!id) {
		return res.status(400).send('Senders id is required');
	}

	// Logic to send push notification
	io.emit(id, { message });
	res.status(200).send(`message from sent successful`);
});

// Socket.io event for new connections
io.on('connection', (socket) => {
	console.log('New client connected');

	// Store connection
	connections[socket.id] = socket;

	// Disconnect event
	socket.on('disconnect', () => {
		delete connections[socket.id];
		console.log('Client disconnected');
	});
});

// Start listening to incoming connections
server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
