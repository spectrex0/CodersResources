const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 3001;

app.get('/api', (_, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  
    }
);
app.use(express.json());
app.use(cors(
  'https://codersresources.vercel.app',
  'http://localhost:3000',
));
const dataDir = path.join(__dirname, './data', 'feedbacks.json');

if (!fs.existsSync(dataDir)) {
  fs.writeFileSync(dataDir, JSON.stringify([]));
}

app.post('/api/feedbacks', (req, res) => {
  const { userName, comment } = req.body;

  if (!comment) {
    return res.status(400).json({ error: 'The comment are required.' });
  }

  try {
    const feedbacks = JSON.parse(fs.readFileSync(dataDir, 'utf-8'));

    const newFeedback = { userName, comment };
    feedbacks.push(newFeedback);

    fs.writeFileSync(dataDir, JSON.stringify(feedbacks, null, 2));

    res.status(200).json({ message: 'Comment saved successfully! thx for ur message', });
    console.log('Feedback saved:', newFeedback.comment + `\n from ${userName}`);
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(500).json({ error: 'Failed to save feedback' });
  }
});

app.get('/api/feedbacks', (req, res) => {
  try {
    const feedbacks = JSON.parse(fs.readFileSync(dataDir, 'utf-8'));
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error('Error reading feedbacks:', error);
    res.status(500).json({ error: 'Failed to read feedbacks' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend launched http://localhost:${PORT}/api`);
});