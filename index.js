const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Url = require('./models/Url');
const app = express();
const PORT = process.env.PORT || 5000;


app.use(bodyParser.json());
app.use(express.static('public'));




mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

// Redirect dummy link to actual link
app.get('/:dummylink', async (req, res) => {
  try {
    const url = await Url.findOne({ dummylink: req.params.dummylink });
    if (!url) {
      return res.status(404).send('Link not found');
    }
    if (!url.actuallink) {
      return res.status(400).send('something went wrong');//actual link not set yet
    }
    res.redirect(url.actuallink);
  } catch (err) {
    res.status(500).send(err.message);
  }
});










    app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});