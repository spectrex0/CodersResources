const express = require('express');
const cors = require('cors');

const server = express();

const PORT = process.env.PORT || 3000;

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get('/', (req, res) => {
    res.send('Nice, u are here LMAO');
});
const feedbacks = [];

server.post('/feedback', (req, res) => {
    const { name, message } = req.body;
    if (!name || !message) {
        return res.status(400).json({ error: 'Name and message are required' });
    }
    const feedback = { id: feedbacks.length + 1, name, message };
    feedbacks.push(feedback);
    res.status(201).json(feedback);
});

server.get('/feedback', (req, res) => {
    res.json(feedbacks);
});