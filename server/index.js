const express = require("express");
const cors = require("cors");
const db = require('./db.json');
const app = express();


app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.

app.get("/api/compliment", (req, res) => {
  const compliments = ["Gee, you're a smart cookie!",
					 "Cool shirt!",
					 "Your Javascript skills are stellar.",
  ];

  // choose random compliment
  let randomIndex = Math.floor(Math.random() * compliments.length);
  let randomCompliment = compliments[randomIndex];

  res.status(200).send(randomCompliment);
  
});

app.get('/api/fortune', (req, res) => {
  const fortunes = [
    'You will be robbed today!',
    'A piano will fall on your head!!!',
    'Buy an eyepatch, you\'ll need it later today.',
    'Another normal day I suppose...',
    'You\'ll open a digital fortune cookie today through the use of a button!'
  ]

  let randIndex = Math.floor(Math.random() * fortunes.length);
  let randFortune = fortunes[randIndex];

  res.status(200).send(randFortune);
});

let id = 6;

app.post('/api/good', (req, res) => {
  const {good} = req.body;
  const newGood = {
    id,
    good
  }

  db.push(newGood);

  id++;
  res.status(200).send(newGood);
});

app.get('/api/good', (req, res) => {
  res.status(200).send(db);
});

app.delete('/api/good/:id', (req, res) => {
  for (let i = 0; i < db.length; i++) {
    if (db[i].id + '' === req.params.id) {
      db.splice(i, 1);
      res.status(200).send('Deleted:' + req.params.id);
      return;
    }
  }
  res.status(204).send('Error! No item found in database!');
});

app.put('/api/good/', (req, res) => {
  for (let i = 0; i < db.length; i++) {
    db[i].good = req.body.replace;
  }
  res.status(200).send(db);
});

app.listen(4000, () => console.log("Server running on 4000"));
