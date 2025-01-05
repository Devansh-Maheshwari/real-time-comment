const express = require('express');
const mysql = require('mysql2');
const socketIo = require('socket.io');
const http = require('http');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

app.use(cors());
app.use(express.json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Dev@10234',
  database: 'comments_system'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database!');
});

// Login API (simple username-based session)
app.post('/api/login', (req, res) => {
  const { username } = req.body;
  if (username) {
    const sessionId = `${Date.now()}-${Math.random()}`;
    res.json({ sessionId, username });
  } else {
    res.status(400).json({ error: 'Username is required' });
  }
});

// Get all comments
app.get('/api/comments', (req, res) => {
  db.query('SELECT * FROM comments ORDER BY timestamp DESC', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Post a new comment
app.post('/api/comments', (req, res) => {
  const { username, comment } = req.body;
  const timestamp = new Date();
  
  db.query('INSERT INTO comments (username, comment, timestamp) VALUES (?, ?, ?)', [username, comment, timestamp], (err, result) => {
    if (err) throw err;
    console.log("emmited");
    io.emit('new-comment', { username, comment, timestamp });
    res.status(201).json({ message: 'Comment posted successfully' });
  });
});

// Socket.IO - Real-time broadcast for new comments
io.on('connection', (socket) => {
  console.log('New client connected');
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
