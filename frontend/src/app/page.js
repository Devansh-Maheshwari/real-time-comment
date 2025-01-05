"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Box, Typography, List, ListItem, ListItemText, Paper } from '@mui/material';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); 

export default function Home() {
  const [username, setUsername] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/comments')
      .then(response => setComments(response.data));

    socket.on('new-comment', (newComment) => {
      console.log("got")
      setComments(prevComments => [newComment, ...prevComments]);
    });

    return () => {
      socket.off('new-comment');
    };
  }, []);

  const handleLogin = () => {
    if (username) {
      axios.post('http://localhost:5000/api/login', { username })
        .then(response => {
          setSessionId(response.data.sessionId);
        });
    }
  };

  const handlePostComment = () => {
    if (comment && username) {
      axios.post('http://localhost:5000/api/comments', { username, comment })
        .then(() => {
          setComment('');
        });
    }
  };

  return (
    <Container maxWidth="sm">
      {!sessionId ? (
        <Box>
          <TextField
            label="Enter your username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
          />
          <Button onClick={handleLogin} variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </Box>
      ) : (
        <Box>
          <Typography variant="h5" gutterBottom>Welcome, {username}!</Typography>
          <TextField
            label="Post a comment"
            variant="outlined"
            fullWidth
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            margin="normal"
          />
          <Button onClick={handlePostComment} variant="contained" color="secondary" fullWidth>
            Post Comment
          </Button>
          
          <Paper sx={{ mt: 3, p: 2 }}>
            <Typography variant="h6">Comments</Typography>
            <List>
              {comments.map((comment,index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={`${comment.username} at ${new Date(comment.timestamp).toLocaleString()}`}
                    secondary={comment.comment}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>
      )}
    </Container>
  );
}
