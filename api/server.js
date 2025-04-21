const express = require('express');
const cors = require('cors');
const { createServer } = require('@vercel/node'); // Vercel serverless adapter

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const apiRouter = express.Router();

apiRouter.get('/', (req, res) => {
    res.send('Nice, u are here LMAO');
});

const feedbacks = [];

apiRouter.post('/feedback', (req, res) => {
    const { name, message } = req.body;
    if (!name || !message) {
        return res.status(400).json({ error: 'Name and message are required' });
    }
    const feedback = { id: feedbacks.length + 1, name, message };
    feedbacks.push(feedback);
    res.status(201).json(feedback);
});

apiRouter.get('/feedback', (req, res) => {
    res.json(feedbacks);
});

server.use('/api', apiRouter);

server.get('/changelogs', (req, res) => {
    res.sendFile(__dirname + '/changes.txt');
});

// Export the server as a Vercel-compatible handler
module.exports = createServer(server);
