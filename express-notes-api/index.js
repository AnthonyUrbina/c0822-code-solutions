const express = require('express');
const app = express();
const jsonData = require('./data.json');
const fs = require('fs');
const jsonMiddleware = express.json();
let nextId = jsonData.nextId;

app.use(jsonMiddleware);

app.get('/api/notes', (req, res) => {
  res.json([jsonData]);
});

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  if (id < 0) {
    res.status(400).json({ error: 'id must be a positive integer.' });
  } else if (jsonData.notes[id]) {
    res.json(jsonData.notes[id]);
  } else {
    res.status(404).json({ error: `cannot find note with id ${id}.` });
  }
});

app.post('/api/notes', (req, res) => {
  if (!req.body.content) {
    res.status(400).json({ error: 'content is a required field.' });
  } else {
    jsonData.notes[nextId] = req.body;
    jsonData.notes[nextId].id = nextId;
    nextId++;
    jsonData.nextId = nextId;
    fs.writeFile('./data.json', JSON.stringify(jsonData, null, 2), err => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'An unexpected error occurred.' });
      } else {
        res.status(201).json(jsonData.notes[nextId - 1]);
      }
    });
  }
});

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  if (id < 0) {
    res.status(400).json({ error: 'id must be a positive integer.' });
  } else if (!jsonData.notes[id]) {
    res.status(404).json({ error: `cannot find note with id ${id}.` });
  } else {
    delete jsonData.notes[id];
    fs.writeFile('./data.json', JSON.stringify(jsonData, null, 2), err => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'An unexpected error occurred.' });
      } else {
        res.status(204).send();
      }
    }
    );
  }
});

app.put('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  if (id < 0 || !req.body.content) {
    res.status(400);
    if (id < 0) {
      res.json({ error: 'id must be a positive integer.' });
    } else {
      res.json({ error: 'content is a required field.' });
    }
  } else if (!jsonData.notes[id]) {
    res.status(404).json({ error: `cannot find note with id ${id}.` });
  } else {
    jsonData.notes[id].content = req.body.content;
    fs.writeFile('./data.json', JSON.stringify(jsonData, null, 2), err => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'An unexpected error occurred.' });
      } else {
        res.status(200).json(jsonData.notes[id]).send();
      }
    });
  }
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port 3000!');
});
