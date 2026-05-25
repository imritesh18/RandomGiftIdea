const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/api/gifts', (req, res) => {
  fs.readFile(__dirname + '/gifts.json', 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read data' });
    const gifts = JSON.parse(data);
    res.json(gifts);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
