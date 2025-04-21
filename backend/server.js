import express from 'express';
import cors from 'cors';

const server = express();

const PORT = process.env.PORT || 3001;

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const apiRouter = express.Router();

apiRouter.get('/', (_, res) => {
    res.json({ message: 'Welcome to the backend for coders resources!' });
    res.sendFile(Path.join(__dirname, '/index.html'));
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

apiRouter.get('/feedback', (_, res) => {
    res.json(feedbacks);
});

server.use('/api', apiRouter);

server.listen(PORT, () => {
    console.log(`Backend for coders resources running ✔`);
});

server.get('/changelogs', (_, res) => {
    res.sendFile(__dirname + '/changes.txt');
});

server.use(express.static('codersresources'));